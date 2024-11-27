import { Editor } from '@milkdown/kit/core';
import { stepSchema } from './StepNode';
import { processSchema, wrapInProcessInputRule } from './ProcessNode';

export function configureStepFeature(editor: Editor) {
  editor.use(stepSchema);
  editor.use(processSchema);
  editor.use(wrapInProcessInputRule);
}
