import { linkTooltipAPI } from '@milkdown/kit/component/link-tooltip';
import { Ctx } from '@milkdown/kit/ctx';
import {
  toggleEmphasisCommand,
  toggleLinkCommand,
  toggleStrongCommand,
  insertHrCommand,
} from '@milkdown/kit/preset/commonmark';
import { toggleStrikethroughCommand } from '@milkdown/kit/preset/gfm';
import { callCommand } from '@milkdown/kit/utils';
