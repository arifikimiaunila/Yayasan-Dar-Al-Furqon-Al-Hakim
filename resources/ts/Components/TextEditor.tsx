import { useEffect, useState, type ReactNode } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import YouTube from '@tiptap/extension-youtube';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

// ---------------------------------------------------------------------------
// Custom extensions
// ---------------------------------------------------------------------------

const FontSizeTextStyle = TextStyle.extend({
    addAttributes() {
        return {
            ...(this.parent?.() ?? {}),
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
    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
        const { style, ...rest } = HTMLAttributes;
        const newStyle = 'font-weight: bold;' + (style ? ' ' + style : '');
        return ['span', { ...rest, style: newStyle.trim() }, 0];
    },
    addOptions() {
        return {
            ...(this.parent?.() ?? {}),
            HTMLAttributes: {},
        };
    },
});

const CellBackground = TableCell.extend({
    addAttributes() {
        return {
            ...(this.parent?.() ?? {}),
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
                parseHTML: (element: HTMLElement) =>
                    element.style.backgroundColor.replace(/['"]+/g, '') || null,
            },
        };
    },
});

// ---------------------------------------------------------------------------
// Data untuk dropdown
// ---------------------------------------------------------------------------

const HEADING_LEVELS = [
    { label: 'H1', level: 1 },
    { label: 'H2', level: 2 },
    { label: 'H3', level: 3 },
    { label: 'H4', level: 4 },
    { label: 'H5', level: 5 },
    { label: 'H6', level: 6 },
] as const;

const TEXT_SIZES = [
    { label: 'Kecil', value: '0.75rem' },
    { label: 'Sedang', value: '0.875rem' },
    { label: 'Normal', value: '1rem' },
    { label: 'Besar', value: '1.125rem' },
    { label: 'Lebih Besar', value: '1.25rem' },
    { label: 'Judul Kecil', value: '1.5rem' },
    { label: 'Judul Sedang', value: '1.875rem' },
    { label: 'Judul Besar', value: '2.25rem' },
] as const;

const FONT_FAMILIES = [
    { label: 'Sans Serif', value: 'sans-serif' },
    { label: 'Serif', value: 'serif' },
    { label: 'Monospace', value: 'monospace' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Tahoma', value: 'Tahoma' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS' },
] as const;

const PRESET_COLORS = [
    '#000000',
    '#434343',
    '#666666',
    '#999999',
    '#b7b7b7',
    '#cccccc',
    '#d9d9d9',
    '#efefef',
    '#ffffff',
    '#980000',
    '#ff0000',
    '#ff9900',
    '#ffff00',
    '#00ff00',
    '#00ffff',
    '#4a86e8',
    '#0000ff',
    '#9900ff',
    '#ff00ff',
] as const;

// ---------------------------------------------------------------------------
// Komponen UI kecil untuk toolbar
// ---------------------------------------------------------------------------

const idleButton =
    'min-w-8 h-8 px-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium inline-flex items-center justify-center gap-1';
const activeButton =
    'min-w-8 h-8 px-2 rounded-md bg-blue-600 text-white text-sm font-medium inline-flex items-center justify-center gap-1';

function ToolButton({
    active = false,
    disabled = false,
    onClick,
    title,
    children,
}: {
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    title: string;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            title={title}
            aria-label={title}
            disabled={disabled}
            onClick={onClick}
            className={`${active ? activeButton : idleButton} ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
        >
            {children}
        </button>
    );
}

function ToolbarDropdown({
    label,
    title,
    children,
    align = 'left',
    widthClass = 'w-56',
}: {
    label: ReactNode;
    title: string;
    children: ReactNode;
    align?: 'left' | 'right';
    widthClass?: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                type="button"
                title={title}
                onClick={() => setOpen((o) => !o)}
                className={idleButton}
            >
                {label}
                <svg
                    className="w-3 h-3 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
                    <div
                        className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} z-40 mt-1 ${widthClass} max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-xl`}
                        onClick={() => setOpen(false)}
                    >
                        {children}
                    </div>
                </>
            )}
        </div>
    );
}

function DropdownItem({
    active = false,
    onClick,
    children,
}: {
    active?: boolean;
    onClick?: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                active
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
            {children}
        </button>
    );
}

function Divider() {
    return <span className="w-px h-6 bg-gray-200 mx-1" aria-hidden="true" />;
}

// ---------------------------------------------------------------------------
// Komponen utama
// ---------------------------------------------------------------------------

interface TextEditorProps {
    value?: string;
    onChange?: (html: string) => void;
}

export default function TextEditor({ value = '', onChange }: TextEditorProps) {
    // Paksa re-render setiap ada transaksi agar state aktif toolbar ikut update.
    const [, setTick] = useState(0);

    const [cellModalOpen, setCellModalOpen] = useState(false);
    const [attrName, setAttrName] = useState('');
    const [attrValue, setAttrValue] = useState('');

    const editor = useEditor({
        immediatelyRender: false,
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
            CellBackground,
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
        content: value,
        editorProps: {
            attributes: {
                class: 'tiptap-content focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
        onTransaction: () => setTick((t) => t + 1),
    });

    // Sinkronkan nilai dari luar (mis. saat form di-reset) ke dalam editor.
    useEffect(() => {
        if (!editor) {
            return;
        }
        if (value !== editor.getHTML()) {
            editor.commands.setContent(value, false);
        }
    }, [value, editor]);

    const active = (name: string, attrs?: Record<string, any>) =>
        editor?.isActive(name, attrs) ?? false;

    const textStyleAttrs = editor?.getAttributes('textStyle') ?? {};
    const currentFontSize = textStyleAttrs.fontSize as string | undefined;
    const currentFontFamily = textStyleAttrs.fontFamily as string | undefined;
    const currentColor = textStyleAttrs.color as string | undefined;

    const focus = () => editor?.chain().focus();

    // --- Handler toolbar ---
    const toggleHighlight = () => {
        if (active('highlight')) {
            focus()?.unsetHighlight().run();
        } else {
            focus()?.setHighlight({ color: '#ffc078' }).run();
        }
    };
 
    const setLink = () => {
        const url = window.prompt('Masukkan URL tautan:', 'https://');
        if (url) {
            focus()?.toggleLink({ href: url }).run();
        }
    };

    const setImage = () => {
        const url = window.prompt('Masukkan URL gambar:', 'https://placehold.co/600x400');
        if (url) {
            focus()?.setImage({ src: url }).run();
        }
    };

    const setVideo = () => {
        const url = window.prompt(
            'Masukkan URL YouTube:',
            'https://www.youtube.com/watch?v=KaLxCiilHns',
        );
        if (url) {
            focus()
                ?.setYoutubeVideo({ src: url, width: 640, height: 480 })
                .run();
        }
    };

    const applyCellAttribute = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editor || !attrName || !attrValue) {
            return;
        }
        editor.chain().focus().setCellAttribute(attrName, attrValue).run();
        setAttrName('');
        setAttrValue('');
        setCellModalOpen(false);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-gray-100 bg-gray-50/60 p-2">
                <ToolButton
                    title="Undo"
                    disabled={!editor?.can().undo()}
                    onClick={() => focus()?.undo().run()}
                >
                    ↺
                </ToolButton>
                <ToolButton
                    title="Redo"
                    disabled={!editor?.can().redo()}
                    onClick={() => focus()?.redo().run()}
                >
                    ↻
                </ToolButton>

                <Divider />

                <ToolButton
                    title="Tebal"
                    active={active('bold')}
                    onClick={() => focus()?.toggleBold().run()}
                >
                    <span className="font-bold">B</span>
                </ToolButton>
                <ToolButton
                    title="Miring"
                    active={active('italic')}
                    onClick={() => focus()?.toggleItalic().run()}
                >
                    <span className="italic">I</span>
                </ToolButton>
                <ToolButton
                    title="Garis Bawah"
                    active={active('underline')}
                    onClick={() => focus()?.toggleUnderline().run()}
                >
                    <span className="underline">U</span>
                </ToolButton>
                <ToolButton
                    title="Coret"
                    active={active('strike')}
                    onClick={() => focus()?.toggleStrike().run()}
                >
                    <span className="line-through">S</span>
                </ToolButton>
                <ToolButton
                    title="Sorot (Highlight)"
                    active={active('highlight')}
                    onClick={toggleHighlight}
                >
                    <span className="bg-amber-200 px-1 rounded">A</span>
                </ToolButton>
                <ToolButton
                    title="Kode"
                    active={active('code')}
                    onClick={() => focus()?.toggleCode().run()}
                >
                    {'</>'}
                </ToolButton>

                <Divider />

                <ToolbarDropdown label="¶" title="Paragraf & Heading">
                    <DropdownItem
                        active={active('paragraph')}
                        onClick={() => focus()?.setParagraph().run()}
                    >
                        Paragraf
                    </DropdownItem>
                    {HEADING_LEVELS.map((h) => (
                        <DropdownItem
                            key={h.level}
                            active={active('heading', { level: h.level })}
                            onClick={() =>
                                focus()?.toggleHeading({ level: h.level }).run()
                            }
                        >
                            {h.label} —{' '}
                            {h.level === 1
                                ? 'Judul Utama'
                                : `Sub Judul ${h.level}`}
                        </DropdownItem>
                    ))}
                </ToolbarDropdown>

                <ToolbarDropdown label="Aa" title="Ukuran Teks" widthClass="w-44">
                    {TEXT_SIZES.map((s) => (
                        <DropdownItem
                            key={s.value}
                            active={currentFontSize === s.value}
                            onClick={() =>
                                focus()?.setMark('textStyle', { fontSize: s.value }).run()
                            }
                        >
                            <span style={{ fontSize: s.value }}>{s.label}</span>
                        </DropdownItem>
                    ))}
                </ToolbarDropdown>

                <ToolbarDropdown label="Font" title="Jenis Huruf">
                    {FONT_FAMILIES.map((f) => (
                        <DropdownItem
                            key={f.value}
                            active={currentFontFamily === f.value}
                            onClick={() =>
                                focus()?.setFontFamily(f.value).run()
                            }
                        >
                            <span style={{ fontFamily: f.value }}>{f.label}</span>
                        </DropdownItem>
                    ))}
                </ToolbarDropdown>

                <Divider />

                <ToolbarDropdown
                    label={
                        <span
                            className="inline-block h-4 w-4 rounded-full border border-gray-300"
                            style={{
                                backgroundColor: currentColor || '#374151',
                            }}
                        />
                    }
                    title="Warna Teks"
                    widthClass="w-52"
                >
                    <div className="p-2">
                        <input
                            type="color"
                            value={currentColor || '#000000'}
                            onChange={(e) =>
                                focus()?.setColor(e.target.value).run()
                            }
                            className="w-full h-8 cursor-pointer rounded"
                        />
                        <div className="mt-2 grid grid-cols-6 gap-1">
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    title={color}
                                    onClick={() => focus()?.setColor(color).run()}
                                    className={`h-6 w-6 rounded-full border ${
                                        currentColor === color
                                            ? 'ring-2 ring-blue-500 border-white'
                                            : 'border-gray-300'
                                    }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => focus()?.unsetColor().run()}
                            className="mt-2 w-full text-left px-2 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                        >
                            Reset Warna
                        </button>
                    </div>
                </ToolbarDropdown>

                <Divider />

                <ToolButton
                    title="Rata Kiri"
                    active={editor?.isActive({ textAlign: 'left' }) ?? false}
                    onClick={() => focus()?.setTextAlign('left').run()}
                >
                    ⬅
                </ToolButton>
                <ToolButton
                    title="Rata Tengah"
                    active={editor?.isActive({ textAlign: 'center' }) ?? false}
                    onClick={() => focus()?.setTextAlign('center').run()}
                >
                    ↔
                </ToolButton>
                <ToolButton
                    title="Rata Kanan"
                    active={editor?.isActive({ textAlign: 'right' }) ?? false}
                    onClick={() => focus()?.setTextAlign('right').run()}
                >
                    ➡
                </ToolButton>

                <Divider />

                <ToolButton
                    title="Daftar (Bullet)"
                    active={active('bulletList')}
                    onClick={() => focus()?.toggleBulletList().run()}
                >
                    • List
                </ToolButton>
                <ToolButton
                    title="Daftar Bernomor"
                    active={active('orderedList')}
                    onClick={() => focus()?.toggleOrderedList().run()}
                >
                    1. List
                </ToolButton>
                <ToolButton
                    title="Kutipan"
                    active={active('blockquote')}
                    onClick={() => focus()?.toggleBlockquote().run()}
                >
                    ❝
                </ToolButton>
                <ToolButton
                    title="Garis Pemisah"
                    onClick={() => focus()?.setHorizontalRule().run()}
                >
                    —
                </ToolButton>

                <Divider />

                <ToolButton
                    title="Tautan"
                    active={active('link')}
                    onClick={setLink}
                >
                    Link
                </ToolButton>
                <ToolButton
                    title="Hapus Tautan"
                    disabled={!active('link')}
                    onClick={() => focus()?.unsetLink().run()}
                >
                    Unlink
                </ToolButton>
                <ToolButton title="Gambar" onClick={setImage}>
                    Img
                </ToolButton>
                <ToolButton title="Video YouTube" onClick={setVideo}>
                    YT
                </ToolButton>

                <Divider />

                <ToolbarDropdown label="Tabel" title="Tabel" widthClass="w-56">
                    <DropdownItem
                        onClick={() =>
                            focus()
                                ?.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                                .run()
                        }
                    >
                        Sisipkan Tabel
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.addColumnBefore().run()}>
                        Tambah Kolom Kiri
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.addColumnAfter().run()}>
                        Tambah Kolom Kanan
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.deleteColumn().run()}>
                        Hapus Kolom
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.addRowBefore().run()}>
                        Tambah Baris Atas
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.addRowAfter().run()}>
                        Tambah Baris Bawah
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.deleteRow().run()}>
                        Hapus Baris
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.deleteTable().run()}>
                        Hapus Tabel
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.mergeCells().run()}>
                        Gabung Sel
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.splitCell().run()}>
                        Pisah Sel
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.mergeOrSplit().run()}>
                        Gabung / Pisah
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => focus()?.toggleHeaderColumn().run()}
                    >
                        Header Kolom
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.toggleHeaderRow().run()}>
                        Header Baris
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => focus()?.toggleHeaderCell().run()}
                    >
                        Header Sel
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.fixTables().run()}>
                        Perbaiki Tabel
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => focus()?.goToPreviousCell().run()}
                    >
                        Sel Sebelumnya
                    </DropdownItem>
                    <DropdownItem onClick={() => focus()?.goToNextCell().run()}>
                        Sel Berikutnya
                    </DropdownItem>
                </ToolbarDropdown>

                <ToolButton title="Atribut Sel Tabel" onClick={() => setCellModalOpen(true)}>
                    Sel
                </ToolButton>
            </div>

            {/* Area editor */}
            <EditorContent
                editor={editor}
                className="p-5 min-h-[320px] text-gray-800"
            />

            {/* Modal atribut sel tabel */}
            {cellModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="text-lg font-black text-gray-900 mb-4">
                            Atribut Sel Tabel
                        </h3>
                        <form onSubmit={applyCellAttribute} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                                    Nama Atribut
                                </label>
                                <input
                                    type="text"
                                    value={attrName}
                                    onChange={(e) => setAttrName(e.target.value)}
                                    placeholder="colspan, rowspan, ..."
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                                    Nilai
                                </label>
                                <input
                                    type="text"
                                    value={attrValue}
                                    onChange={(e) => setAttrValue(e.target.value)}
                                    placeholder="2, 100%, ..."
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setCellModalOpen(false)}
                                    className="px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
                                >
                                    Terapkan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Re-export tipe Editor agar bisa dipakai komponen lain bila perlu.
export type { Editor };
