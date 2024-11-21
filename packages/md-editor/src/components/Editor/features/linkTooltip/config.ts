import {
  configureLinkTooltip,
  linkTooltipPlugin,
} from '@milkdown/kit/component/link-tooltip';
import { Editor } from '@milkdown/kit/core';

export function configureLinkTooltipFeature(editor: Editor) {
  editor.config(configureLinkTooltip).use(linkTooltipPlugin);
}
