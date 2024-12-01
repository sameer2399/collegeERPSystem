import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, Slate, ReactEditor } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Box } from "@chakra-ui/react";
import { Element, Leaf, toggleMark, Toolbar } from "./components";
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
// return all the values in html format
const Editors = ({ onChange, type }) => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(
    (props) => React.createElement(Element, Object.assign({}, props)),
    []
  );
  const renderLeaf = useCallback(
    (props) => React.createElement(Leaf, Object.assign({}, props)),
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  //focus selection
  const [focused, setFocused] = React.useState(false);
  const savedSelection = React.useRef(editor.selection);
  const onFocus = React.useCallback(() => {
    var _a;
    setFocused(true);
    if (
      !editor.selection &&
      (value === null || value === void 0 ? void 0 : value.length)
    ) {
      Transforms.select(
        editor,
        (_a = savedSelection.current) !== null && _a !== void 0
          ? _a
          : Editor.end(editor, [])
      );
    }
  }, [editor]);
  const onBlur = React.useCallback(() => {
    setFocused(false);
    savedSelection.current = editor.selection;
  }, [editor]);
  const divRef = React.useRef(null);
  const focusEditor = React.useCallback(
    (e) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor);
        e.preventDefault();
      }
    },
    [editor]
  );
  const onKeyDown = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };
  return React.createElement(
    Box,
    { ref: divRef, onMouseDown: focusEditor, borderWidth: "1px" },
    React.createElement(
      Slate,
      {
        editor: editor,
        value: value,
        onChange: (value) => onChange(value),
        type: "text",
        name: "rules",
      },
      React.createElement(Toolbar, null),
      React.createElement(
        Box,
        { padding: "15px 5px" },
        React.createElement(Editable, {
          onFocus: onFocus,
          onBlur: onBlur,
          onKeyDown: onKeyDown,
          renderElement: renderElement,
          renderLeaf: renderLeaf,
          placeholder: "Enter event Rules\u2026",
          spellCheck: true,
          className: "overflow-hidden text-start p-1",
          name: "rules",
          type: "rules",
          // onChange,
        })
      )
    )
  );
};

export { Editors };
