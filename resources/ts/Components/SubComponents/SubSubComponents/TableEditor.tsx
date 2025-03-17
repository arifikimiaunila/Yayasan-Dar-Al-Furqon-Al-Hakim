import { Button, Popover} from "flowbite-react";
import {AddAttribute} from "./AddAttribute";
import { ReactNode } from "react";
import React from "react";
import Box from "@/assets/Box";

export default function Tableditor(): ReactNode{
return
<>
<Popover
      aria-labelledby="default-popover"
      content={
    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
    <div className="border-b px-3 py-2 dark:border-gray-600">
    <div className="flex items-center gap-2">
        <Button.Group className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse">
            <Button outline gradientDuoTone="purpleToBlue" id="addTableButton" type="button" data-tooltip-target="tooltip-table" >
                <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v3c0 .5523.44772 1 1 1h10.5M3 15v-4m0 4h11M3 11V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5M3 11h18m0 0v1M8 11v8m4-8v8m4-8v2m1 4h2m0 0h2m-2 0v2m0-2v-2"/>
                </svg>
                <span className="sr-only">Buat tabel</span>
            </Button>
            <div id="tooltip-table" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                Buat tabel
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="cyanToBlue" id="deleteTableButton" type="button" data-tooltip-target="tooltip-delete-table" >
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h10.5M3 15.5v-4m0 4h11m-11-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5m-18 0h18m0 0v1m-13-1v8m4-8v8m4-8v2m1.8956 5.9528 1.5047-1.5047m0 0 1.5048-1.5048m-1.5048 1.5048 1.4605 1.4604m-1.4605-1.4604-1.4604-1.4605"/>
                </svg>
                <span className="sr-only">Delete table</span>
            </Button>
            <div id="tooltip-delete-table" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                Hapus tabel
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="px-1">
                <span className="block h-4 w-px bg-gray-300 dark:bg-gray-600"></span>
            </div>
            <Button outline gradientDuoTone="greenToBlue" id="addColumnBeforeButton" type="button" data-tooltip-target="tooltip-add-column-before">
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5.5v14m-8-7h2m0 0h2m-2 0v2m0-2v-2m12 1h-6m6 4h-6m-11 4h16c.5523 0 1-.4477 1-1v-12c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z"/>
                </svg>
                <span className="sr-only">Tambahkan kolom sebelumnya</span>
            </Button>
            <div id="tooltip-add-column-before" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                Tambahkan kolom sebelumnya
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="purpleToPink" id="addColumnAfterButton" type="button" data-tooltip-target="tooltip-add-column-after" >
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5.5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2m-12 1h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1v-12c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"/>
                </svg>
                <span className="sr-only">Tambahkan kolom setelahnya</span>
            </Button>
            <div id="tooltip-add-column-after" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
            Tambahkan kolom setelahnya
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="pinkToOrange" type="button" data-tooltip-target="tooltip-remove-column" >
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5.5v14m-6-8h6m-6 4h6m4.5061-1.4939L15.0123 12.5m0 0 1.5061-1.5061M15.0123 12.5l1.5061 1.5061M15.0123 12.5l-1.5062-1.5061M20 19.5H4c-.55228 0-1-.4477-1-1v-12c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"/>
                </svg>
                <span className="sr-only">Hapus kolom</span>
            </Button>
            <div id="tooltip-remove-column" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
            Hapus kolom
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="px-1">
                <span className="block h-4 w-px bg-gray-300 dark:bg-gray-600"></span>
            </div>
            <Button outline gradientDuoTone="tealToLime" id="addRowBeforeButton" type="button" data-tooltip-target="tooltip-add-row-before">
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-6-9h2m0 0h2m-2 0v2m0-2v-2"/>
                </svg>
                <span className="sr-only">Tambahkan baris sebelumnya</span>
            </Button>
            <div id="tooltip-add-row-before" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
            Tambahkan baris sebelumnya
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="redToYellow" id="addRowAfterButton" type="button" data-tooltip-target="tooltip-add-row-after">
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9.5v-3c0-.55228.44772-1 1-1h16c.5523 0 1 .44771 1 1v3m-18 0v9c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-9m-18 0h18m-13 0v-4m4 4v-4m4 4v-4m-6 9h2m0 0h2m-2 0v-2m0 2v2"/>
                </svg>
                <span className="sr-only">Tambahkan baris setelahnya</span>
            </Button>
            <div id="tooltip-add-row-after" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
            Tambahkan baris setelahnya
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="cyanToBlue" id="removeRowButton" type="button" data-tooltip-target="tooltip-remove-row">
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-5.5061-7.4939L12 10.5m0 0 1.5061-1.50614M12 10.5l1.5061 1.5061M12 10.5l-1.5061-1.50614"/>
                </svg>
                <span className="sr-only">Hapus baris</span>
            </Button>
            <div id="tooltip-remove-row" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
            Hapus baris
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </Button.Group>
    </div>
    <Button.Group className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse">
        <Button outline gradientDuoTone="cyanToBlue" id="mergeCellsButton" type="button" data-tooltip-target="tooltip-merge-cells">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 18.5v2H4v-16h6v2m4 12v2h6v-16h-6v2m-6.49543 8.4954L10 12.5m0 0-2.49543-2.4954M10 12.5H4.05191m12.50199 2.5539L14 12.5m0 0 2.5539-2.55392M14 12.5h5.8319"/>
            </svg>
            <span className="sr-only">Gabungkan sel</span>
        </Button>
        <div id="tooltip-merge-cells" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
        Gabungkan sel
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="greenToBlue" id="splitCellsButton" type="button" data-tooltip-target="tooltip-split-cells">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 18.5v2h6v-16H4v2m16 12v2h-6v-16h6v2M6.49545 14.9954 4.00003 12.5m0 0 2.49542-2.4954M4.00003 12.5h5.94809m7.49798 2.5539L20 12.5m0 0-2.5539-2.55392M20 12.5h-5.8319"/>
            </svg>
            <span className="sr-only">Bagi sel</span>
        </Button>
        <div id="tooltip-split-cells" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
        Bagi sel
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="purpleToPink" id="mergeOrSplitButton" type="button" data-tooltip-target="tooltip-merge-or-split">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5045 14.9954 21 12.5m0 0-2.4955-2.4954M21 12.5h-5.9481m-9.49798 2.5539L3 12.5m0 0 2.55392-2.55392M3 12.5h5.83192m.16807 7v-14H15v14H8.99999Z"/>
            </svg>
            <span className="sr-only">Merge or split</span>
        </Button>
        <div id="tooltip-merge-or-split" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
            Gabungkan atau bagi
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="px-1">
            <span className="block h-4 w-px bg-gray-300 dark:bg-gray-600"></span>
        </div>
        <Button outline gradientDuoTone="pinkToOrange" id="toggleHeaderColumnButton" type="button" data-tooltip-target="tooltip-toggle-header-column" >
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5.5v14m6-8h-6m6 4h-6m-9-3h1.99093M4 19.5h16c.5523 0 1-.4477 1-1v-12c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Zm8-7c0 1.1046-.8954 2-2 2-1.10457 0-2-.8954-2-2s.89543-2 2-2c1.1046 0 2 .8954 2 2Z"/>
            </svg>
            <span className="sr-only">Alihkan kolom header</span>
        </Button>
        <div id="tooltip-toggle-header-column" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
        Alihkan kolom header
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="purpleToBlue" id="toggleHeaderRowButton" type="button" data-tooltip-target="tooltip-toggle-header-row">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-7-9h1.9909M15 10.5c0 1.1046-.8954 2-2 2s-2-.8954-2-2c0-1.10457.8954-2 2-2s2 .89543 2 2Z"/>
            </svg>
            <span className="sr-only">Alihkan baris header</span>
        </Button>
        <div id="tooltip-toggle-header-row" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
        Alihkan baris header
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="purpleToPink" id="toggleHeaderCellButton" type="button" data-tooltip-target="tooltip-toggle-header-cell">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-7-9h1.9909M15 10.5c0 1.1046-.8954 2-2 2s-2-.8954-2-2c0-1.10457.8954-2 2-2s2 .89543 2 2Z"/>
            </svg>
            <span className="sr-only">Toggle header cell</span>
        </Button>
        <div id="tooltip-toggle-header-cell" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
        Alihkan sel header
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <AddAttribute/>
        <Button outline gradientDuoTone="pinkToOrange" id="fixTablesButton" type="button" data-tooltip-target="tooltip-fix-tables">
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h4v-4m-5 0v-4m0 4h5m-5-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v1.98935M3 11.5h5v4m9.4708 4.1718-.8696-1.4388-2.8164-.235-2.573-4.2573 1.4873-2.8362 1.4441 2.3893c.3865.6396 1.2183.8447 1.8579.4582.6396-.3866.8447-1.2184.4582-1.858l-1.444-2.38925h3.1353l2.6101 4.27715-1.0713 2.5847.8695 1.4388"/>
            </svg>
            <span className="sr-only">Perbaiki tabel</span>
        </Button>
        <div id="tooltip-fix-tables" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
        Perbaiki tabel
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="tealToLime" id="previousCellButton" type="button" data-tooltip-target="tooltip-previous-cell" >
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h9.5M3 15.5v-4m0 4h9m-9-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5H3Zm5 0v8m4-8v8m5.9001-1.0999L16 16.5m0 0 1.9001-1.9001M16 16.5h5"/>
            </svg>
            <span className="sr-only">Sel sebelumnya</span>
        </Button>
        <div id="tooltip-previous-cell" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
        Sel sebelumnya
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="redToYellow" id="nextCellButton" type="button" data-tooltip-target="tooltip-next-cell" >
            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h9.5M3 15.5v-4m0 4h9m-9-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5H3Zm5 0v8m4-8v8m7.0999-1.0999L21 16.5m0 0-1.9001-1.9001M21 16.5h-5"/>
            </svg>
            <span className="sr-only">Sel berikutnya</span>
        </Button>
        <div id="tooltip-next-cell" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
        Sel berikutnya
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </Button.Group>
</div>
</div>
}
>
<Button gradientDuoTone="purpleToBlue">
<Box/>
</Button>
</Popover>
</>;
}

