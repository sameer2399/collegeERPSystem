import {
  IconButton,
  HStack,
  useColorMode,
  chakra,
  ListItem,
  OrderedList,
  UnorderedList,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdLooksOne,
  MdLooksTwo,
} from "react-icons/md";
import { useSlate } from "slate-react";
import { Editor, Transforms, Element as SlateElement } from "slate";
const LIST_TYPES = ["numbered-list", "bulleted-list"];
const isBlockActive = (editor, format) => {
  const nodeGen = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });
  let node = nodeGen.next();
  while (!node.done) {
    return true;
  }
  return false;
};
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });
  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
export const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return React.createElement(IconButton, {
    variant: "outline",
    colorScheme: "blue",
    isActive: isMarkActive(editor, format),
    onMouseDown: (event) => {
      event.preventDefault();
      toggleMark(editor, format);
    },
    "aria-label": format,
    icon: icon,
    borderWidth: 0,
    fontSize: "20px",
  });
};
export const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return React.createElement(IconButton, {
    variant: "outline",
    colorScheme: "blue",
    isActive: isBlockActive(editor, format),
    onMouseDown: (event) => {
      event.preventDefault();
      toggleBlock(editor, format);
    },
    "aria-label": format,
    icon: icon,
    borderWidth: 0,
    fontSize: "20px",
  });
};
export const Toolbar = () => {
  return React.createElement(
    HStack,
    {
      borderWidth: "0 0 1px 0",
      padding: "10px 5px",
      spacing: "5px",
      wrap: "wrap",
    },
    React.createElement(MarkButton, {
      format: "bold",
      icon: React.createElement(MdFormatBold, null),
    }),
    React.createElement(MarkButton, {
      format: "italic",
      icon: React.createElement(MdFormatItalic, null),
    }),
    React.createElement(MarkButton, {
      format: "underline",
      icon: React.createElement(MdFormatUnderlined, null),
    }),
    React.createElement(MarkButton, {
      format: "code",
      icon: React.createElement(MdCode, null),
    }),
    React.createElement(BlockButton, {
      format: "heading-one",
      icon: React.createElement(MdLooksOne, null),
    }),
    React.createElement(BlockButton, {
      format: "heading-two",
      icon: React.createElement(MdLooksTwo, null),
    }),
    React.createElement(BlockButton, {
      format: "block-quote",
      icon: React.createElement(MdFormatQuote, null),
    }),
    React.createElement(BlockButton, {
      format: "numbered-list",
      icon: React.createElement(MdFormatListNumbered, null),
    }),
    React.createElement(BlockButton, {
      format: "bulleted-list",
      icon: React.createElement(MdFormatListBulleted, null),
    })
  );
};
const BlockquoteStyle = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
};
export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return React.createElement(
        chakra.blockquote,
        Object.assign(
          {
            style: BlockquoteStyle,
            borderLeftWidth: "10px",
            borderLeftColor: "gray.200",
          },
          attributes
        ),
        children
      );
    case "list-item":
      return React.createElement(
        ListItem,
        Object.assign({}, attributes),
        children
      );
    case "numbered-list":
      return React.createElement(
        OrderedList,
        Object.assign({}, attributes),
        children
      );
    case "bulleted-list":
      return React.createElement(
        UnorderedList,
        Object.assign({}, attributes),
        children
      );
    case "heading-one":
      return React.createElement(
        Heading,
        Object.assign({ as: "h1", size: "3xl" }, attributes),
        children
      );
    case "heading-two":
      return React.createElement(
        Heading,
        Object.assign({ as: "h2", size: "2xl" }, attributes),
        children
      );
    default:
      return React.createElement("p", Object.assign({}, attributes), children);
  }
};
export const Leaf = ({ attributes, children, leaf }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  if (leaf.bold) {
    children = React.createElement(
      "strong",
      { className: "font-[Acharya-bold]" },
      children
    );
  }
  if (leaf.code) {
    children = React.createElement(
      chakra.code,
      {
        padding: "3px",
        backgroundColor: colorMode === "dark" ? "gray.700" : "gray.200",
        fontSize: "90%",
      },
      children
    );
  }
  if (leaf.italic) {
    children = React.createElement("em", null, children);
  }
  if (leaf.underline) {
    children = React.createElement("u", null, children);
  }
  return React.createElement("span", Object.assign({}, attributes), children);
};
