import {ColorLists} from './ColorsBox';
import GroupButtons from './GroupButtons';
import {Button} from "flowbite-react";
import Tableditor from './TableEditor';
import { Teditor} from '@/ts part/Text-Editor';
import { ReactNode } from 'react';

export function TextEditor(): ReactNode{
Teditor();
return 
<>
<div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
    <div className="px-3 py-2 border-b dark:border-gray-600">
        <Button.Group className="flex flex-wrap items-center">
            <Button.Group>
                <Button id="toggleBoldButton" data-tooltip-target="tooltip-bold" type="button" outline gradientDuoTone="purpleToBlue">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"/>
                    </svg>
                    <span className="sr-only">Bold</span>
                </Button>
                <div id="tooltip-bold" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Toggle bold
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleUndoButton" data-tooltip-target="tooltip-undo" type="button" outline gradientDuoTone="cyanToBlue">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"/>
                    </svg>
                    <span className="sr-only">Undo</span>
                </Button>
                <div id="tooltip-undo" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Undo
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleRedoButton" data-tooltip-target="tooltip-redo" type="button" outline gradientDuoTone="pinkToOrange">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4"/>
                    </svg>
                    <span className="sr-only">Redo</span>
                </Button>
                <div id="tooltip-redo" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Redo
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleItalicButton" data-tooltip-target="tooltip-italic" type="button" outline gradientDuoTone="cyanToBlue">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"/>
                    </svg>
                    <span className="sr-only">Italic</span>
                </Button>
                <div id="tooltip-italic" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Toggle italic
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleUnderlineButton" data-tooltip-target="tooltip-underline" type="button" outline gradientDuoTone="greenToBlue">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"/>
                    </svg>
                    <span className="sr-only">Underline</span>
                </Button>
                <div id="tooltip-underline" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Toggle underline
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleStrikeButton" data-tooltip-target="tooltip-strike" type="button" outline gradientDuoTone="purpleToPink">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477"/>
                    </svg>
                    <span className="sr-only">Strike</span>
                </Button>
                <div id="tooltip-strike" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Toggle strike
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleHighlightButton" data-tooltip-target="tooltip-highlight" type="button" outline gradientDuoTone="pinkToOrange">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 19.2H5.5c-.3 0-.5-.2-.5-.5V16c0-.2.2-.4.5-.4h13c.3 0 .5.2.5.4v2.7c0 .3-.2.5-.5.5H18m-6-1 1.4 1.8h.2l1.4-1.7m-7-5.4L12 4c0-.1 0-.1 0 0l4 8.8m-6-2.7h4m-7 2.7h2.5m5 0H17"/>
                    </svg>
                    <span className="sr-only">Highlight</span>
                </Button>
                <div id="tooltip-highlight" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Toggle highlight
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleCodeButton" type="button" data-tooltip-target="tooltip-code" outline gradientDuoTone="tealToLime">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"/>
                    </svg>
                    <span className="sr-only">Code</span>
                </Button>
                <div id="tooltip-code" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Format code
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleLinkButton" data-tooltip-target="tooltip-link" type="button" outline gradientDuoTone="redToYellow">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
                    </svg>
                    <span className="sr-only">Link</span>
                </Button>
                <div id="tooltip-link" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Add link
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="removeLinkButton" data-tooltip-target="tooltip-remove-link" type="button" outline gradientDuoTone="purpleToBlue">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.2 9.8a3.4 3.4 0 0 0-4.8 0L5 13.2A3.4 3.4 0 0 0 9.8 18l.3-.3m-.3-4.5a3.4 3.4 0 0 0 4.8 0L18 9.8A3.4 3.4 0 0 0 13.2 5l-1 1m7.4 14-1.8-1.8m0 0L16 16.4m1.8 1.8 1.8-1.8m-1.8 1.8L16 20"/>
                    </svg>
                    <span className="sr-only">Remove link</span>
                </Button>
                <div id="tooltip-remove-link" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Remove link
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button id="toggleTextSizeButton" data-dropdown-toggle="textSizeDropdown" type="button" data-tooltip-target="tooltip-text-size" outline gradientDuoTone="cyanToBlue">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3"/>
                    </svg>
                    <span className="sr-only">Text size</span>
                </Button>
                <div id="tooltip-text-size" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Text size
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button.Group id="textSizeDropdown">
                    <ul className="space-y-1 text-sm font-medium" aria-labelledby="toggleTextSizeButton">
                        <li>
                            <Button data-text-size="16px" type="button" className="flex justify-between items-center w-full text-base rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">16px (Default) 
                            </Button>
                        </li>
                        <li>
                            <Button data-text-size="12px" type="button" className="flex justify-between items-center w-full text-xs rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">12px (Tiny)
                            </Button>
                        </li>
                        <li>
                            <Button data-text-size="14px" type="button" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">14px (Small)
                            </Button>
                        </li>
                        <li>
                            <Button data-text-size="18px" type="button" className="flex justify-between items-center w-full text-lg rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">18px (Lead)
                            </Button>
                        </li>
                        <li>
                            <Button data-text-size="24px" type="button" className="flex justify-between items-center w-full text-2xl rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">24px (Large)
                            </Button>
                        </li>
                        <li>
                            <Button data-text-size="36px" type="button" className="flex justify-between items-center w-full text-4xl rounded px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white">36px (Huge)
                            </Button>
                        </li>
                    </ul>
                </Button.Group>
                <Button id="toggleText" data-dropdown-toggle="textColorDropdown" type="button" data-tooltip-target="tooltip-text-color" outline gradientDuoTone="greenToBlue">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m6.532 15.982 1.573-4m-1.573 4h-1.1m1.1 0h1.65m-.077-4 2.725-6.93a.11.11 0 0 1 .204 0l2.725 6.93m-5.654 0H8.1m.006 0h5.654m0 0 .617 1.569m5.11 4.453c0 1.102-.854 1.996-1.908 1.996-1.053 0-1.907-.894-1.907-1.996 0-1.103 1.907-4.128 1.907-4.128s1.909 3.025 1.909 4.128Z"/>
                    </svg>
                    <span className="sr-only">Text color</span>
                </Button>
                <div id="tooltip-text-color" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Text color
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <GroupButtons>
                {() => (<ColorLists tipe={'button'} dhcolor={''}/>)}
                </GroupButtons>
                <Button id="toggleFontFamilyButton" data-dropdown-toggle="fontFamilyDropdown" type="button" data-tooltip-target="tooltip-font-family" outline gradientDuoTone="purpleToPink">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.6 19 4.298-10.93a.11.11 0 0 1 .204 0L19.4 19m-8.8 0H9.5m1.1 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.985h4.4M3.021 16l1.567-3.985m0 0L7.32 5.07a.11.11 0 0 1 .205 0l2.503 6.945h-5.44Z"/>
                    </svg>
                    <span className="sr-only">Font family</span>
                </Button>
                <div id="tooltip-font-family" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Font Family
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button.Group id="fontFamilyDropdown" className="z-10 hidden w-48 rounded bg-white p-2 shadow dark:bg-gray-700">
                    <ul className="space-y-1 text-sm font-medium" aria-labelledby="toggleFontFamilyButton">
                        <li>
                            <Button 
                            data-font-family="Inter, ui-sans-serif" 
                            type="button" 
                            outline 
                            gradientDuoTone="cyanToBlue"
                            >
                                Default
                            </Button>
                        </li>
                        <li>
                        <Button 
                        data-font-family="Arial, sans-serif" 
                        type="button" 
                        outline 
                        gradientDuoTone="cyanToBlue" 
                        style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                          Arial
                        </Button>
                        </li>
                        <li>
                        <Button 
                          data-font-family="'Courier New', monospace" 
                          type="button" 
                          outline 
                          gradientDuoTone="cyanToBlue"  
                          style={{ fontFamily: "'Courier New', monospace" }}
                        >
                          Courier New
                        </Button>
                        </li>
                        <li>
                            <Button 
                            data-font-family="Georgia, serif" 
                            type="button" 
                            outline 
                            gradientDuoTone="cyanToBlue"  
                            style={{ fontFamily: "Georgia, serif" }}
                            >
                                Georgia
                            </Button>
                        </li>
                        <li>
                            <Button 
                            data-font-family="'Lucida Sans Unicode', sans-serif" 
                            type="button" 
                            outline 
                            gradientDuoTone="cyanToBlue"
                            style={{ fontFamily: "'Lucida Sans Unicode', sans-serif" }}
                            >
                                Lucida Sans Unicode
                            </Button>
                        </li>
                        <li>
                            <Button 
                            data-font-family="Tahoma, sans-serif" 
                            type="button" 
                            outline 
                            gradientDuoTone="cyanToBlue" 
                            style={{ fontFamily: "Tahoma, sans-serif" }}
                            >
                                Tahoma
                            </Button>
                        </li>
                        <li>
                            <Button 
                            data-font-family="'Times New Roman', serif;" 
                            type="button" 
                            outline 
                            gradientDuoTone="cyanToBlue" 
                            style={{ fontFamily: "'Times New Roman', serif" }}
                            >
                                Times New Roman
                            </Button>
                        </li>
                        <li>
                            <Button 
                            data-font-family="'Trebuchet MS', sans-serif" 
                            type="button" 
                            outline 
                            gradientDuoTone="cyanToBlue"
                            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                            >
                                Trebuchet MS
                            </Button>
                        </li>
                        <li>
                            <Button 
                            data-font-family="Verdana, sans-serif" 
                            type="button" 
                            outline 
                            gradientDuoTone="cyanToBlue"
                            style={{ fontFamily: "Verdana, sans-serif" }}
                            >
                                Verdana
                            </Button>
                        </li>
                    </ul>
                </Button.Group>
                <div className="px-1">
                    <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                </div>
                <Button outline gradientDuoTone="purpleToPink" id="toggleLeftAlignButton" type="button" data-tooltip-target="tooltip-left-align">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6h8m-8 4h12M6 14h8m-8 4h12"/>
                    </svg>
                    <span className="sr-only">Align left</span>
                </Button>
                <div id="tooltip-left-align" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Align left
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button outline gradientDuoTone="cyanToBlue" id="toggleCenterAlignButton" type="button" data-tooltip-target="tooltip-center-align">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h8M6 10h12M8 14h8M6 18h12"/>
                    </svg>
                    <span className="sr-only">Align center</span>
                </Button>
                <div id="tooltip-center-align" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Align center
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Button outline gradientDuoTone="purpleToBlue" id="toggleRightAlignButton" type="button" data-tooltip-target="tooltip-right-align">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6h-8m8 4H6m12 4h-8m8 4H6"/>
                    </svg>
                    <span className="sr-only">Align right</span>
                </Button>
                <div id="tooltip-right-align" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Align right
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </Button.Group>
            <Tableditor/>
    </Button.Group>
    
    <Button.Group className="flex items-center gap-2 pt-2 flex-wrap">
        <Button id="typographyDropdownButton" data-dropdown-toggle="typographyDropdown" outline gradientDuoTone="purpleToBlue" type="button">
            Format
            <svg className="-me-0.5 ms-1.5 h-3.5 w-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
            </svg>
        </Button>
        <div className="ps-1.5">
            <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
        </div>
        <Button.Group id="typographyDropdown" className="z-10 hidden w-72 rounded bg-white p-2 shadow dark:bg-gray-700">
            <ul className="space-y-1 text-sm font-medium" aria-labelledby="typographyDropdownButton">
                <li>
                    <Button id="toggleParagraphButton" type="button" outline gradientDuoTone="tealToLime">Paragraph 
                        <div className="space-x-1.5">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">0</kbd>
                        </div>
                    </Button>
                </li>
                <li>
                    <Button data-heading-level="1" type="button" outline gradientDuoTone="pinkToOrange">Heading 1 
                        <div className="space-x-1.5">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">1</kbd>
                        </div>
                    </Button>
                </li>
                <li>
                    <Button  data-heading-level="2" type="button" outline gradientDuoTone="pinkToOrange">Heading 2 
                        <div className="space-x-1.5">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">2</kbd>
                        </div>
                    </Button>
                </li>
                <li>
                    <Button  data-heading-level="3" type="button" outline gradientDuoTone="purpleToPink">Heading 3
                        <div className="space-x-1.5">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">3</kbd>
                        </div>
                    </Button>
                </li>
                <li>
                    <Button  data-heading-level="4" type="button" outline gradientDuoTone="greenToBlue">Heading 4
                        <div className="space-x-1.5">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">4</kbd>
                        </div>
                    </Button>
                </li>
                <li>
                    <Button data-heading-level="5" type="button" outline gradientDuoTone="cyanToBlue">Heading 5
                        <div className="space-x-1.5">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">5</kbd>
                        </div>
                    </Button>
                </li>
                <li>
                    <Button  data-heading-level="6" type="button" outline gradientDuoTone="purpleToBlue">Heading 6
                        <div className="space-x-1.5">
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Cmd</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">Alt</kbd>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">6</kbd>
                        </div>
                    </Button>
                </li>
            </ul>
        </Button.Group>
        <Button id="addImageButton" type="button" data-tooltip-target="tooltip-image" outline gradientDuoTone="redToYellow">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clip-rule="evenodd"/>
                </svg>
                <span className="sr-only">Add image</span>
            </Button>
            <div id="tooltip-image" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Add image
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button id="addVideoButton" type="button" data-tooltip-target="tooltip-video" outline gradientDuoTone="tealToLime">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-2 4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H9Zm0 2h2v2H9v-2Zm7.965-.557a1 1 0 0 0-1.692-.72l-1.268 1.218a1 1 0 0 0-.308.721v.733a1 1 0 0 0 .37.776l1.267 1.032a1 1 0 0 0 1.631-.776v-2.984Z" clip-rule="evenodd"/>
                </svg>
                <span className="sr-only">Add video</span>
            </Button>
            <div id="tooltip-video" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Add video
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button id="toggleListButton" type="button" data-tooltip-target="tooltip-list" outline gradientDuoTone="pinkToOrange">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"/>
                </svg>
                <span className="sr-only">Toggle list</span>
            </Button>
            <div id="tooltip-list" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Toggle list
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button id="toggleOrderedListButton" type="button" data-tooltip-target="tooltip-ordered-list" outline gradientDuoTone="purpleToPink">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
            </svg>
            <span className="sr-only">Toggle ordered list</span>
        </Button>
        <div id="tooltip-ordered-list" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Toggle ordered list
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button id="toggleBlockquoteButton" type="button" data-tooltip-target="tooltip-blockquote-list" outline gradientDuoTone="greenToBlue">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clip-rule="evenodd"/>
            </svg>
            <span className="sr-only">Toggle blockquote</span>
        </Button>
        <div id="tooltip-blockquote-list" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Toggle blockquote
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button id="toggleHRButton" type="button" data-tooltip-target="tooltip-hr-list" outline gradientDuoTone="cyanToBlue">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 12h14"/>
                <path stroke="currentColor" stroke-linecap="round" d="M6 9.5h12m-12 9h12M6 7.5h12m-12 9h12M6 5.5h12m-12 9h12"/>
            </svg>
            <span className="sr-only">Toggle Horizontal Rule</span>
        </Button>
        <div id="tooltip-hr-list" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Toggle Horizontal Rule
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </Button.Group>
</div>
<div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
    <label htmlFor="teditor" className="sr-only">Publish post</label>
    <div id="teditor"className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"></div>
</div>
</div>
</>
;
}
