import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { createTexEditor } from '@/Layouts/ts-js part/texditor';

const TexEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'basic' | 'text' | 'align' | 'table' | 'export'>('all');
  const [htmlOutput, setHtmlOutput] = useState('');

  const { editor, actions } = createTexEditor({
    content: `<p>Mulai mengetik di <b>Texditor v2</b>...</p><table><tbody><tr><th>Header 1</th><th>Header 2</th></tr><tr><td>Cell 1</td><td>Cell 2</td></tr></tbody></table>`,
  }) as any;

  // useEditor wrapper biar React lifecycle benar
  const tiptapEditor = useEditor({
    extensions: editor.extensionManager.extensions,
    content: editor.options.content,
    editorProps: editor.options.editorProps,
  });

  // pakai editor dari tiptapEditor untuk render
  const currentEditor = tiptapEditor;
  const isActive = (name: string, attrs?: any) => currentEditor?.isActive(name, attrs);

  const handleGetContent = () => {
    if (!currentEditor) return;
    setHtmlOutput(currentEditor.getHTML());
  };

  if (!currentEditor) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-white border rounded-lg p-4 shadow-sm">
          <h1 className="text-xl font-bold">Texditor - Fixed TSX</h1>
          <div className="flex gap-2">
            <button onClick={handleGetContent} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Get HTML</button>
            <button onClick={() => actions.undo()} className="px-3 py-2 border rounded-lg text-sm">↩</button>
            <button onClick={() => actions.redo()} className="px-3 py-2 border rounded-lg text-sm">↪</button>
          </div>
        </div>

        {/* Tabs - cuma filter toolbar, bukan ganti editor */}
        <div className="flex flex-wrap gap-2">
          {[
            {k:'all', l:'Semua'},
            {k:'basic', l:'Basic'},
            {k:'text', l:'Text Style'},
            {k:'align', l:'Alignment'},
            {k:'table', l:'Table'},
            {k:'export', l:'Export'},
          ].map(tab=>(
            <button key={tab.k} onClick={()=>setActiveTab(tab.k as any)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${activeTab===tab.k? 'bg-blue-600 text-white' : 'bg-white'}`}>{tab.l}</button>
          ))}
        </div>

        {/* SINGLE EDITOR CONTAINER */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-2 border-b flex flex-wrap gap-1 items-center bg-gray-50">
            {(activeTab==='all' || activeTab==='basic') && (
              <>
                <button onClick={() => currentEditor.chain().focus().toggleBold().run()} className={`p-1.5 rounded ${isActive('bold')? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}><b>B</b></button>
                <button onClick={() => currentEditor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded ${isActive('italic')? 'bg-blue-100' : 'hover:bg-gray-200'}`}><i>I</i></button>
                <button onClick={() => currentEditor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded ${isActive('underline')? 'bg-blue-100' : 'hover:bg-gray-200'}`}><u>U</u></button>
                <button onClick={() => currentEditor.chain().focus().toggleStrike().run()} className={`p-1.5 rounded ${isActive('strike')? 'bg-blue-100' : 'hover:bg-gray-200'}`}>S</button>
                <button onClick={() => currentEditor.chain().focus().toggleCode().run()} className="p-1.5 rounded hover:bg-gray-200">{'</>'}</button>
                <span className="w-px h-4 bg-gray-300 mx-1" />
              </>
            )}

            {(activeTab==='all' || activeTab==='text') && (
              <>
                <button onClick={() => currentEditor.chain().focus().toggleSubscript().run()} className={`p-1.5 rounded text-xs ${isActive('subscript')? 'bg-blue-100' : 'hover:bg-gray-200'}`}>X₂</button>
                <button onClick={() => currentEditor.chain().focus().toggleSuperscript().run()} className={`p-1.5 rounded text-xs ${isActive('superscript')? 'bg-blue-100' : 'hover:bg-gray-200'}`}>X²</button>
                <input type="color" onChange={(e)=> currentEditor.chain().focus().setColor(e.target.value).run()} className="w-6 h-6" title="Warna teks" />
                <select onChange={(e)=> currentEditor.chain().focus().setFontSize(e.target.value).run()} className="text-xs border rounded px-1 py-1">
                  <option value="12px">12px</option><option value="16px">16px</option><option value="18px">18px</option><option value="24px">24px</option><option value="36px">36px</option>
                </select>
                <select onChange={(e)=> currentEditor.chain().focus().setFontFamily(e.target.value).run()} className="text-xs border rounded px-1 py-1">
                  <option value="Inter">Default</option><option value="Arial">Arial</option><option value="Courier New">Courier</option><option value="Georgia">Georgia</option>
                </select>
              </>
            )}

            {(activeTab==='all' || activeTab==='align') && (
              <>
                <button onClick={()=> currentEditor.chain().focus().setTextAlign('left').run()} className="p-1.5 hover:bg-gray-200 rounded">⟵</button>
                <button onClick={()=> currentEditor.chain().focus().setTextAlign('center').run()} className="p-1.5 hover:bg-gray-200 rounded">↔</button>
                <button onClick={()=> currentEditor.chain().focus().setTextAlign('right').run()} className="p-1.5 hover:bg-gray-200 rounded">⟶</button>
                <button onClick={()=> currentEditor.chain().focus().setTextAlign('justify').run()} className="p-1.5 hover:bg-gray-200 rounded">☰</button>
              </>
            )}

            {activeTab==='all' && (
              <>
                <button onClick={()=> { const url=prompt('Link:'); if(url) currentEditor.chain().focus().setLink({href:url}).run(); }} className="p-1.5 hover:bg-gray-200 rounded">🔗</button>
                <button onClick={()=> currentEditor.chain().focus().unsetLink().run()} className="p-1.5 hover:bg-gray-200 rounded">Unlink</button>
                <button onClick={()=> currentEditor.chain().focus().setImage({src: prompt('Image URL:')||''}).run()} className="p-1.5 hover:bg-gray-200 rounded">🖼</button>
                <button onClick={()=> currentEditor.chain().focus().setYoutubeVideo({src: prompt('Youtube URL:')||''}).run()} className="p-1.5 hover:bg-gray-200 rounded">▶</button>
              </>
            )}

            {(activeTab==='all' || activeTab==='table') && (
              <div className="flex gap-1 ml-2 border-l pl-2">
                <button onClick={()=> currentEditor.chain().focus().insertTable({rows:3, cols:3, withHeaderRow:true}).run()} className="px-2 py-1 text-xs border rounded bg-white">+ Table</button>
                <button onClick={()=> currentEditor.chain().focus().addRowAfter().run()} className="px-2 py-1 text-xs border rounded bg-white">+ Row</button>
                <button onClick={()=> currentEditor.chain().focus().addColumnAfter().run()} className="px-2 py-1 text-xs border rounded bg-white">+ Col</button>
                <button onClick={()=> currentEditor.chain().focus().toggleHeaderRow().run()} className="px-2 py-1 text-xs border rounded bg-white">Header</button>
                <button onClick={()=> currentEditor.chain().focus().fixTables().run()} className="px-2 py-1 text-xs border rounded bg-white">Fix</button>
                <button onClick={()=> currentEditor.chain().focus().deleteTable().run()} className="px-2 py-1 text-xs border rounded bg-red-50 text-red-600">Del Table</button>
              </div>
            )}
          </div>

          <EditorContent editor={currentEditor} />
        </div>

        {htmlOutput && (
          <div className="bg-gray-900 text-green-300 p-4 rounded-lg font-mono text-xs overflow-auto">
            <pre className="whitespace-pre-wrap">{htmlOutput}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TexEditor;