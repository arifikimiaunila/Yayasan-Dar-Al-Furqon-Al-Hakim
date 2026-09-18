import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import YouTube from '@tiptap/extension-youtube';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Bold from '@tiptap/extension-bold';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

type WysiwygOptions = {
  content?: string;
  defaultLink?: string;
  defaultImage?: string;
  defaultVideo?: string;
  defaultHighlightColor?: string;
};

export const createTexEditor = (options: WysiwygOptions = {}) => {
  const {
    content = `<p>Halo, ini <b>Texditor</b> yang sudah diperbaiki 🚀</p>`,
    defaultLink = "https://flowbite.com",
    defaultImage = "https://placehold.co/600x400",
    defaultVideo = "https://www.youtube.com/watch?v=KaLxCiilHns",
    defaultHighlightColor = "#ffc078",
  } = options;

  const editor = new Editor({
    extensions: [
      StarterKit.configure({
        bold: false, // kita pakai extension Bold sendiri biar bisa di-custom
      }),
      Bold,
      Highlight.configure({ multicolor: true }),
      Underline,
      Subscript,
      Superscript,
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: false, allowBase64: true }),
      YouTube.configure({ width: 640, height: 480 }),
      TextStyle,
      FontFamily,
      Color,
      FontSize, // untuk text-size dropdown kamu
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none focus:outline-none min-h- p-4',
      },
    },
  });

  // Helper methods biar bisa dipanggil dari React component
  const actions = {
    toggleBold: () => editor.chain().focus().toggleBold().run(),
    toggleItalic: () => editor.chain().focus().toggleItalic().run(),
    toggleUnderline: () => editor.chain().focus().toggleUnderline().run(),
    toggleStrike: () => editor.chain().focus().toggleStrike().run(),
    toggleSubscript: () => editor.chain().focus().toggleSubscript().run(),
    toggleSuperscript: () => editor.chain().focus().toggleSuperscript().run(),
    toggleHighlight: () => {
      const isActive = editor.isActive('highlight');
      if (isActive) editor.chain().focus().unsetHighlight().run();
      else editor.chain().focus().toggleHighlight({ color: defaultHighlightColor }).run();
    },
    toggleCode: () => editor.chain().focus().toggleCode().run(),
    toggleCodeBlock: () => editor.chain().focus().toggleCodeBlock().run(),
    setLink: () => {
      const url = window.prompt('Enter link URL:', defaultLink);
      if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    },
    unsetLink: () => editor.chain().focus().unsetLink().run(),
    setTextSize: (size: string) => editor.chain().focus().setFontSize(size).run(),
    setColor: (color: string) => editor.chain().focus().setColor(color).run(),
    resetColor: () => editor.chain().focus().unsetColor().run(),
    setFontFamily: (font: string) => editor.chain().focus().setFontFamily(font).run(),
    setAlign: (align: 'left' | 'center' | 'right' | 'justify') => editor.chain().focus().setTextAlign(align).run(),
    setHeading: (level: number) => editor.chain().focus().toggleHeading({ level: level as any }).run(),
    setParagraph: () => editor.chain().focus().setParagraph().run(),
    toggleBulletList: () => editor.chain().focus().toggleBulletList().run(),
    toggleOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
    toggleBlockquote: () => editor.chain().focus().toggleBlockquote().run(),
    setHR: () => editor.chain().focus().setHorizontalRule().run(),
    addImage: (src?: string) => {
      const url = src || window.prompt('Enter image URL:', defaultImage);
      if (url) editor.chain().focus().setImage({ src: url }).run();
    },
    addVideo: (src?: string) => {
      const url = src || window.prompt('Enter YouTube URL:', defaultVideo);
      if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
    },
    // === TABLE - Fungsi yang kamu minta dipertahankan ===
    addTable: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    addRow: () => editor.chain().focus().addRowAfter().run(),
    addColumn: () => editor.chain().focus().addColumnAfter().run(),
    deleteTable: () => editor.chain().focus().deleteTable().run(),
    deleteRow: () => editor.chain().focus().deleteRow().run(),
    deleteColumn: () => editor.chain().focus().deleteColumn().run(),
    toggleHeaderRow: () => editor.chain().focus().toggleHeaderRow().run(),
    fixTables: () => editor.chain().focus().fixTables().run(),
    setCellAttribute: (name: string, value: string) => editor.chain().focus().setCellAttribute(name, value).run(),
    undo: () => editor.chain().focus().undo().run(),
    redo: () => editor.chain().focus().redo().run(),
    getHTML: () => editor.getHTML(),
    getJSON: () => editor.getJSON(),
  };

  return { editor, actions };
};

// untuk kompatibilitas dengan kode lama kamu
export const getEditorContent = (editor: Editor) => editor.getHTML();

// Custom Extension untuk Font Size (karena dropdown kamu butuh ini)
import { Extension } from '@tiptap/core';
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
    subscript: {
      toggleSubscript: () => ReturnType;
      unsetSubscript: () => ReturnType;
    };
    superscript: {
      toggleSuperscript: () => ReturnType;
      unsetSuperscript: () => ReturnType;
    };
  }
}
export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] } },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: { fontSize: { default: null, parseHTML: el => el.style.fontSize, renderHTML: attrs => attrs.fontSize? { style: `font-size: ${attrs.fontSize}` } : {} } }
    }];
  },
  addCommands() {
    return {
      setFontSize: (size) => ({ chain }) => chain().setMark('textStyle', { fontSize: size }).run(),
      unsetFontSize: () => ({ chain }) => chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});