import { Editor } from 'https://esm.sh/@tiptap/core@2.6.6';
import StarterKit from 'https://esm.sh/@tiptap/starter-kit@2.6.6';
import Highlight from 'https://esm.sh/@tiptap/extension-highlight@2.6.6';
import Underline from 'https://esm.sh/@tiptap/extension-underline@2.6.6';
import Link from 'https://esm.sh/@tiptap/extension-link@2.6.6';
import TextAlign from 'https://esm.sh/@tiptap/extension-text-align@2.6.6';
import Image from 'https://esm.sh/@tiptap/extension-image@2.6.6';
import YouTube from 'https://esm.sh/@tiptap/extension-youtube@2.6.6';
import TextStyle from 'https://esm.sh/@tiptap/extension-text-style@2.6.6';
import FontFamily from 'https://esm.sh/@tiptap/extension-font-family@2.6.6';
import { Color } from 'https://esm.sh/@tiptap/extension-color@2.6.6';
import Bold from 'https://esm.sh/@tiptap/extension-bold@2.6.6'; 
import Table from 'https://esm.sh/@tiptap/extension-table@2.6.6';
import TableCell from 'https://esm.sh/@tiptap/extension-table-cell@2.6.6';
import TableHeader from 'https://esm.sh/@tiptap/extension-table-header@2.6.6';
import TableRow from 'https://esm.sh/@tiptap/extension-table-row@2.6.6';

// 1. Definisikan interface global untuk komponen Flowbite agar compiler TS tidak error
interface FlowbiteComponent {
    hide(): void;
}

declare const FlowbiteInstances: {
    getInstance(type: string, id: string): FlowbiteComponent | null;
};

// Interface untuk parameter konten awal editor
interface EditorConfig {
    body?: string;
}

export function Teditor(values: EditorConfig = {}): void {
    
    // Custom Extension Table Cell dengan tipe atribut eksplisit
    const TipTapExtensionTableCell = TableCell.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                backgroundColor: {
                    default: null,
                    renderHTML: (attributes: Record<string, any>) => {
                        if (!attributes.backgroundColor) {
                            return {};
                        }
                        return {
                            style: `background-color: ${attributes.backgroundColor}`,
                        };
                    },
                    parseHTML: (element: HTMLElement) => {
                        return element.style.backgroundColor.replace(/['"]+/g, '') || null;
                    },
                },
            };
        },
    });

    window.addEventListener('load', () => {
        const editorElement = document.getElementById("teditor");
        if (!editorElement) return;

        const FontSizeTextStyle = TextStyle.extend({
            addAttributes() {
                return {
                    fontSize: {
                        default: null,
                        parseHTML: (element: HTMLElement) => element.style.fontSize || null,
                        renderHTML: (attributes: Record<string, any>) => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return { style: `font-size: ${attributes.fontSize}` };
                        },
                    },
                };
            },
        });

        const CustomBold = Bold.extend({
            renderHTML({ HTMLAttributes }) {
                const { style, ...rest } = HTMLAttributes;
                const newStyle = 'font-weight: bold;' + (style ? ' ' + style : '');
                return ['span', { ...rest, style: newStyle.trim() }, 0];
            },
            addOptions() {
                return {
                    ...this.parent?.(),
                    HTMLAttributes: {},
                };
            },
        });

        // Setup TipTap Editor Instance
        const editor = new Editor({
            element: editorElement,
            extensions: [
                StarterKit.configure({
                    bold: false,
                }),
                Table.configure({
                    resizable: true,
                }),
                TableRow,
                TableHeader,
                TableCell,
                TipTapExtensionTableCell,
                CustomBold,
                TextStyle,
                Color,
                FontSizeTextStyle,
                FontFamily,
                Highlight,
                Underline,
                Link.configure({
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: 'https',
                }),
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Image,
                YouTube,
            ],
            content: values.body || '',
            editorProps: {
                attributes: {
                    class: 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
                },
            }
        });

        // Helper fungsi utilitas untuk melampirkan event click secara aman
        const listenClick = (id: string, callback: () => void) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', callback);
        };

        // --- Event Listeners Toolbar Dasar ---
        listenClick('toggleBoldButton', () => editor.chain().focus().toggleBold().run());
        listenClick('toggleItalicButton', () => editor.chain().focus().toggleItalic().run());
        listenClick('toggleUnderlineButton', () => editor.chain().focus().toggleUnderline().run());
        listenClick('toggleStrikeButton', () => editor.chain().focus().toggleStrike().run());
        
        listenClick('toggleHighlightButton', () => {
            const isHighlighted = editor.isActive('highlight');
            editor.chain().focus().toggleHighlight({
                color: isHighlighted ? undefined : '#ffc078'
            }).run();
        });

        // --- Event Listeners Kontrol Tabel (Struktur Sejajar & Sudah Diperbaiki) ---
        listenClick('addTableButton', () => {
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        });
        listenClick('addColumnBeforeButton', () => editor.chain().focus().addColumnBefore().run());
        listenClick('addColumnAfterButton', () => editor.chain().focus().addColumnAfter().run());
        listenClick('removeColumnButton', () => editor.chain().focus().deleteColumn().run());
        listenClick('addRowBeforeButton', () => editor.chain().focus().addRowBefore().run());
        listenClick('addRowAfterButton', () => editor.chain().focus().addRowAfter().run());
        listenClick('removeRowButton', () => editor.chain().focus().deleteRow().run());
        listenClick('deleteTableButton', () => editor.chain().focus().deleteTable().run());
        listenClick('mergeCellsButton', () => editor.chain().focus().mergeCells().run());
        listenClick('splitCellsButton', () => editor.chain().focus().splitCell().run());
        listenClick('mergeOrSplitButton', () => editor.chain().focus().mergeOrSplit().run());
        listenClick('toggleHeaderColumnButton', () => editor.chain().focus().toggleHeaderColumn().run());
        listenClick('toggleHeaderRowButton', () => editor.chain().focus().toggleHeaderRow().run());
        listenClick('toggleHeaderCellButton', () => editor.chain().focus().toggleHeaderCell().run());
        listenClick('fixTablesButton', () => editor.commands.fixTables());
        listenClick('previousCellButton', () => editor.chain().focus().goToPreviousCell().run());
        listenClick('nextCellButton', () => editor.chain().focus().goToNextCell().run());

        // --- Atribut Sel Tabel Form (Flowbite Modal) ---
        const cellAttrForm = document.getElementById('addCellAttributeForm') as HTMLFormElement | null;
        if (cellAttrForm) {
            cellAttrForm.addEventListener('submit', (e: Event) => {
                e.preventDefault();
                const attributeName = (document.getElementById('attribute-name') as HTMLInputElement | null)?.value;
                const attributeValue = (document.getElementById('attribute-value') as HTMLInputElement | null)?.value;

                if (attributeName && attributeValue) {
                    editor.commands.setCellAttribute(attributeName, attributeValue);
                    cellAttrForm.reset();
                    
                    const cellAttributeModal = FlowbiteInstances.getInstance('Modal', 'cell-attribute-modal');
                    if (cellAttributeModal) cellAttributeModal.hide();
                }
            });
        }

        // --- Link, Code, & Alignments ---
        listenClick('toggleLinkButton', () => {
            const url = window.prompt('Enter image URL:', 'https://flowbite.com');
            if (url) editor.chain().focus().toggleLink({ href: url }).run();
        });
        listenClick('removeLinkButton', () => editor.chain().focus().unsetLink().run());
        listenClick('toggleCodeButton', () => editor.chain().focus().toggleCode().run());
        listenClick('toggleLeftAlignButton', () => editor.chain().focus().setTextAlign('left').run());
        listenClick('toggleCenterAlignButton', () => editor.chain().focus().setTextAlign('center').run());
        listenClick('toggleRightAlignButton', () => editor.chain().focus().setTextAlign('right').run());
        listenClick('toggleListButton', () => editor.chain().focus().toggleBulletList().run());
        listenClick('toggleOrderedListButton', () => editor.chain().focus().toggleOrderedList().run());
        listenClick('toggleBlockquoteButton', () => editor.chain().focus().toggleBlockquote().run());
        listenClick('toggleHRButton', () => editor.chain().focus().setHorizontalRule().run());

        // --- Media Attachments (Image & YouTube) ---
        listenClick('addImageButton', () => {
            const url = window.prompt('Enter image URL:', 'https://placehold.co/600x400');
            if (url) editor.chain().focus().setImage({ src: url }).run();
        });
        listenClick('addVideoButton', () => {
            const url = window.prompt('Enter YouTube URL:', 'https://www.youtube.com/watch?v=KaLxCiilHns');
            if (url) {
                editor.commands.setYoutubeVideo({
                    src: url,
                    width: 640,
                    height: 480,
                });
            }
        });

        // --- Dropdown Typography & Styles ---
        listenClick('toggleParagraphButton', () => {
            editor.chain().focus().setParagraph().run();
            FlowbiteInstances.getInstance('Dropdown', 'typographyDropdown')?.hide();
        });
        
        document.querySelectorAll('[data-heading-level]').forEach((button) => {
            button.addEventListener('click', () => {
                const level = button.getAttribute('data-heading-level');
                if (level) {
                    editor.chain().focus().toggleHeading({ level: parseInt(level) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
                    FlowbiteInstances.getInstance('Dropdown', 'typographyDropdown')?.hide();
                }
            });
        });

        document.querySelectorAll('[data-text-size]').forEach((button) => {
            button.addEventListener('click', () => {
                const fontSize = button.getAttribute('data-text-size');
                if (fontSize) {
                    editor.chain().focus().setMark('textStyle', { fontSize }).run();
                    FlowbiteInstances.getInstance('Dropdown', 'textSizeDropdown')?.hide();
                }
            });
        });

        // --- Color Pickers ---
        const colorPicker = document.getElementById('color') as HTMLInputElement | null;
        if (colorPicker) {
            colorPicker.addEventListener('input', (event: Event) => {
                const selectedColor = (event.target as HTMLInputElement).value;
                editor.chain().focus().setColor(selectedColor).run();
            });
        }

        document.querySelectorAll('[data-hex-color]').forEach((button) => {
            button.addEventListener('click', () => {
                const selectedColor = button.getAttribute('data-hex-color');
                if (selectedColor) editor.chain().focus().setColor(selectedColor).run();
            });
        });

        listenClick('reset-color', () => editor.commands.unsetColor());
        listenClick('toggleUndoButton', () => editor.chain().focus().undo().run());
        listenClick('toggleRedoButton', () => editor.chain().focus().redo().run());

        // --- Font Family ---
        document.querySelectorAll('[data-font-family]').forEach((button) => {
            button.addEventListener('click', () => {
                const fontFamily = button.getAttribute('data-font-family');
                if (fontFamily) {
                    editor.chain().focus().setFontFamily(fontFamily).run();
                    FlowbiteInstances.getInstance('Dropdown', 'fontFamilyDropdown')?.hide();
                }
            });
        });
    });
}
