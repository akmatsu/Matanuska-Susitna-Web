import { type MdEditorProps } from '../components/Editor';
import { Editor as MilkEditor } from '@milkdown/kit/core';
import { useEditor } from '@milkdown/react';
import {
  useNodeViewFactory,
  usePluginViewFactory,
} from '@prosemirror-adapter/react';
import {
  configDocCollectionFeature,
  configureBaseFeatures,
  configureBlockFeature,
  configureLinkTooltipFeature,
  configureListsFeature,
  configurePrimaryActionButtonFeature,
  configureSlashFeature,
  configureStepFeature,
  configureTableFeature,
  configureToolbarFeature,
} from '../components/Editor/features';

export function useEditorConfig({
  block = true,
  linkTooltip = true,
  documentCollections = true,
  primaryActionButton = true,
  slash = true,
  steps = true,
  toolbar = true,
  table = true,
  list,
  ...props
}: MdEditorProps) {
  const nodeViewFactory = useNodeViewFactory();
  const pluginViewFactory = usePluginViewFactory();

  return useEditor((root) => {
    const editor = MilkEditor.make();
    configureBaseFeatures(editor, root, props);

    if (block) {
      configureBlockFeature(editor, pluginViewFactory);
    }
    if (documentCollections) {
      configDocCollectionFeature(editor, pluginViewFactory, nodeViewFactory);
    }
    if (slash) {
      configureSlashFeature(editor, pluginViewFactory);
    }
    if (toolbar) {
      configureToolbarFeature(editor, pluginViewFactory);
    }
    if (table) {
      configureTableFeature(editor);
    }
    if (steps) {
      configureStepFeature(editor);
    }
    if (primaryActionButton) {
      configurePrimaryActionButtonFeature(editor, nodeViewFactory);
    }
    if (linkTooltip) {
      configureLinkTooltipFeature(editor);
    }
    if (list) {
      configureListsFeature(editor);
    }
    return editor;
  });
}
