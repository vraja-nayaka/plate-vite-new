import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate-autoformat';

import { autoformatBlocks } from '@/lib/plate/autoformatBlocks';
import { autoformatIndentLists } from '@/lib/plate/autoformatIndentLists';
import { autoformatLists } from '@/lib/plate/autoformatLists';
import { autoformatMarks } from '@/lib/plate/autoformatMarks';
import { MyAutoformatRule } from '@/lib/plate/plate-types';

export const autoformatRules = [
  ...autoformatBlocks,
  ...autoformatIndentLists,
  ...autoformatLists,
  ...autoformatMarks,
  ...(autoformatSmartQuotes as MyAutoformatRule[]),
  ...(autoformatPunctuation as MyAutoformatRule[]),
  ...(autoformatLegal as MyAutoformatRule[]),
  ...(autoformatLegalHtml as MyAutoformatRule[]),
  ...(autoformatArrow as MyAutoformatRule[]),
  ...(autoformatMath as MyAutoformatRule[]),
];
