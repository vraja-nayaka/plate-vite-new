export enum CommonPluginConstants {
  macroContainerClassname = "sfera-macro-wrapper",
  macroInline = "macro-inline",
}

export const INLINE_MACRO_NAMES = ["status"];

const SELF_CLOSED_MACRO_REGEX = /<macro(?:\s[^>]*)?\/>/gi;
const SELF_CLOSED_MACRO_PARAMETER_REGEX = /<macro-parameter(?:\s[^>]*)?\/>/gi;
const SHORT_CLOSING_TAG_REGEX = /\/>/gi;
const MACRO_OPENING_TAG_REGEX = /<macro(?:\s[^>]*)?>/gi;
const MACRO_CLOSING_TAG_REGEX = /<\/macro>/gi;
const MACRO_OPENING_CLOSING_TAG_REGEX = /(<macro(?:\s[^>]*)?>)|(<\/macro>)/gi;
// эти 2 без флага g, иначе .test неверно себя ведет
const COMMON_OPENING_TAG_REGEX = /<\w+\b(?:(?:"[^"]*"|'[^']*'|[^'">])*)>/;
const COMMON_CLOSING_TAG_REGEX = /<\/\w+\b[^>]*>/;
const COMMON_OPENING_CLOSING_TAG_REGEX =
  /<\w+\b(?:(?:"[^"]*"|'[^']*'|[^'">])*)>|<\/\w+\b[^>]*>/g;

const INLINE_MACRO_CLASSES = `${CommonPluginConstants.macroContainerClassname} ${CommonPluginConstants.macroInline}`;
const WRAPPER_OPENING_TAG = `<div class="${CommonPluginConstants.macroContainerClassname}" contenteditable="false">`;
const WRAPPER_INLINE_OPENING_TAG = `<span class="${INLINE_MACRO_CLASSES}" contenteditable="false">`;
const WRAPPER_CLOSING_TAG = "</div>";
const PARAGRAPH_OPENING_TAG_REGEX = /<p(?:\s[^>]*)?>/gi;
const PARAGRAPH_CLOSING_TAG = "</p>";

// Найденые теги должны быть ближайшими, макрос должен быть внутри найденого тега
export const findLeftOpeningTag = (htmlString: string, position: number) => {
  // Ищем ближайший открытый тег слева от указанной позиции
  const leftSlice = htmlString.slice(0, position);
  const matches = leftSlice.match(COMMON_OPENING_CLOSING_TAG_REGEX) || [];
  const lastMatch = matches.pop();
  const isLastMatchClosest = lastMatch && leftSlice.endsWith(lastMatch);
  const isLastMatchOpening =
    lastMatch && COMMON_OPENING_TAG_REGEX.test(lastMatch);

  return isLastMatchOpening && isLastMatchClosest ? lastMatch : null;
};

export const findRightClosingTag = (htmlString: string, position: number) => {
  // Ищем ближайший закрытый тег справа от указанной позиции
  const positionSlice = htmlString.slice(position);
  const matches = positionSlice.match(COMMON_OPENING_CLOSING_TAG_REGEX) || [];
  const [tagMatch, firstMatch] = matches; // [0] - это сам тег на позиции, нам нужен правый - [1]
  const isFirstMatchClosest =
    firstMatch && positionSlice.startsWith(tagMatch + firstMatch);
  const isFirstMatchClosing =
    firstMatch && COMMON_CLOSING_TAG_REGEX.test(firstMatch);

  return isFirstMatchClosing && isFirstMatchClosest ? firstMatch : null;
};

/*
 Обработать все самозакрывающиеся теги и превратить их в обычные,
 <tag .../> --> <tag...></tag>
 Таким же образом обработать теги <macro-parameter>
 Иначе редактор это сделает сам, но предварительно всех нижних сибилингов сделает
 дочерними для тега, который был самозакрывающимся
 */

export const handleSelfClosedTags = (htmlString: string) => {
  let resultString = htmlString;
  const selfClosedMacroList = resultString.match(SELF_CLOSED_MACRO_REGEX) || [];

  selfClosedMacroList.forEach((macro) => {
    const replacedMacro = macro.replace(SHORT_CLOSING_TAG_REGEX, "></macro>");
    resultString = resultString.replace(macro, replacedMacro);
  });

  const selfClosedMacroParameterList =
    resultString.match(SELF_CLOSED_MACRO_PARAMETER_REGEX) || [];

  selfClosedMacroParameterList.forEach((parameter) => {
    const replacedParameter = parameter.replace(
      SHORT_CLOSING_TAG_REGEX,
      "></macro-parameter>"
    );
    resultString = resultString.replace(parameter, replacedParameter);
  });
  return resultString;
};

/*
  Ручное оборачивание макросов в div - это воркараунд проблемы обработки HTML парсерами
  контента, который имеет нарушения специфицификации HTML.
  Нарушение спецификации происходит когда макросы размещаются внутри тега P
  и в свою очередь могут содержать дочерние макросы. Парсеры пытаются исправить
  невалидный HTML и в результате меняют его структуру, что неприемлемо.
*/

export const wrapMacroByDiv = (htmlString: string) => {
  // получаем все куски строк с открытым тегом макроса
  const openingMacroTagList = htmlString.match(MACRO_OPENING_TAG_REGEX) || [];
  let lastIndex = 0;
  let openingHandledString = "";
  let resultString = "";
  const inlineMacrosIdx = [];

  const macroStack: number[] = [];
  const leftTags: string[] = [];
  const rightTags: string[] = [];
  let match = MACRO_OPENING_CLOSING_TAG_REGEX.exec(htmlString);

  while (match) {
    const tag = match[0];
    const currentMacroIndex = leftTags.length;
    if (tag.match(MACRO_OPENING_TAG_REGEX)) {
      const currentIndex = match.index;

      const leftTag = findLeftOpeningTag(htmlString, currentIndex);

      // Если левый тег, это не wrapper (div.sfera-macro-wrapper, span.macro-inline или p),
      const isWrapperLeftTag =
        leftTag === WRAPPER_OPENING_TAG ||
        leftTag?.includes(INLINE_MACRO_CLASSES) ||
        leftTag?.match(PARAGRAPH_OPENING_TAG_REGEX)?.[0];

      // то считаем, что его нет (с ним ничего делать не нужно)
      leftTags.push(isWrapperLeftTag ? leftTag : "");
      macroStack.push(currentMacroIndex);
    } else {
      const currentIndex = match.index;
      const rightTag = findRightClosingTag(htmlString, currentIndex);
      const closedMacroIndex = macroStack.pop();
      // Если левого ближайшего тега не было, то и правый не считается
      const rightClosingTag = leftTags[closedMacroIndex] ? rightTag : "";
      rightTags.push(rightClosingTag);
      // Если правого тега рядом нет, то и левый не нужно удалять
      if (!rightClosingTag) {
        leftTags[closedMacroIndex] = "";
      }
    }

    match = MACRO_OPENING_CLOSING_TAG_REGEX.exec(htmlString);
  }

  openingMacroTagList.forEach((openingTag, index) => {
    // в цикле выполняем поиск ИНДЕКСА этого куска в контенте

    const currentIndex = htmlString.indexOf(openingTag, lastIndex);
    // определяем - ближайший родитель div или inline макрос
    const leftTag = leftTags[index];
    // если нет - апдейтим контент добавленем дива перед ИНДЕКСОМ

    const isInline = INLINE_MACRO_NAMES.some((name) =>
      openingTag.includes(`data-name="${name}"`)
    );

    if (
      leftTag !== WRAPPER_OPENING_TAG &&
      !leftTag?.includes(INLINE_MACRO_CLASSES)
    ) {
      const openingTagLength = openingTag.length;

      // Если у макроса была обертка параграфом, то вычетаем ее, чтобы не попала в copiedFromOriginal
      const openingParagraphLengthDiff =
        leftTag?.match(PARAGRAPH_OPENING_TAG_REGEX)?.[0]?.length || 0;

      const copiedFromOriginal = htmlString.slice(
        lastIndex,
        currentIndex - openingParagraphLengthDiff
      );

      const wrapperOpeningTag = isInline
        ? WRAPPER_INLINE_OPENING_TAG
        : WRAPPER_OPENING_TAG;

      openingHandledString =
        openingHandledString +
        copiedFromOriginal +
        wrapperOpeningTag +
        openingTag;
      lastIndex = currentIndex + openingTagLength;
    }

    if (isInline) {
      inlineMacrosIdx.push(currentIndex);
    }
  });
  // открывающие теги обработаны. Нужно скопировать оставшуюся часть контента
  openingHandledString = openingHandledString + htmlString.slice(lastIndex);

  const closingMacroTagList =
    openingHandledString.match(MACRO_CLOSING_TAG_REGEX) || [];
  // Обнуляем счетчик перед новым проходом по контенту
  lastIndex = 0;

  let currentInlineMacro = 0;
  const getIsInline = (currentIndex: number) => {
    if (currentInlineMacro < inlineMacrosIdx.length) {
      const inlineIndex = inlineMacrosIdx[currentInlineMacro];
      if (currentIndex > inlineIndex) {
        currentInlineMacro++;
        return true;
      } else {
        return false;
      }
    }

    return false;
  };

  closingMacroTagList.forEach((closingTag, index) => {
    // в цикле выполняем поиск ИНДЕКСА этого куска в контенте
    const currentIndex = openingHandledString.indexOf(closingTag, lastIndex);
    const rightTag = rightTags[index];
    const isInline = getIsInline(currentIndex);

    // определяем - не дивом ли закрывается этот макрос
    // если нет - апдейтим контент добавлением дива после индекса и длины закрывающего макроса
    if (rightTag !== WRAPPER_CLOSING_TAG && !isInline) {
      const closingTagLength = closingTag.length;
      const copiedFromOriginal = openingHandledString.slice(
        lastIndex,
        currentIndex
      );
      resultString =
        resultString + copiedFromOriginal + closingTag + WRAPPER_CLOSING_TAG;

      // Если у макроса была обертка параграфом, то пропускаем ее, чтобы она не попала в result
      const closingParagraphLengthDiff =
        rightTag === PARAGRAPH_CLOSING_TAG ? rightTag.length : 0;

      lastIndex = currentIndex + closingParagraphLengthDiff + closingTagLength;
    }

    // Обрабатка инлайнового макроса добавлением </span> после индекса и длины макроса
    if (isInline) {
      const copiedFromOriginal = openingHandledString.slice(
        lastIndex,
        currentIndex
      );
      resultString = resultString + copiedFromOriginal + closingTag;

      lastIndex = currentIndex + closingTag.length;
    }
  });
  // закрывающие теги обработаны. Нужно скопировать оставшуюся часть контента
  resultString = resultString + openingHandledString.slice(lastIndex);

  return resultString;
};

// export const storageFormatHandler = (editor: Editor, htmlString: string) => {
//   const handledSelfCloseTags = handleSelfClosedTags(htmlString);
//   const result = wrapMacroByDiv(handledSelfCloseTags);
//   return result;
// };
