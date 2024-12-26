import { Button, Popover} from "flowbite-react";
import {AddAttribute} from "./AddAttribute";
import { ReactNode } from "react";

export default function Tableditor(): ReactNode{
return
<>
<Popover
      aria-labelledby="default-popover"
      content={
    <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
    <div className="px-3 py-2 border-b dark:border-gray-600">
    <div className="flex items-center gap-2">
        <Button.Group className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
            <Button outline gradientDuoTone="purpleToBlue" id="addTableButton" type="button" data-tooltip-target="tooltip-table" >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v3c0 .5523.44772 1 1 1h10.5M3 15v-4m0 4h11M3 11V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5M3 11h18m0 0v1M8 11v8m4-8v8m4-8v2m1 4h2m0 0h2m-2 0v2m0-2v-2"/>
                </svg>
                <span className="sr-only">Add table</span>
            </Button>
            <div id="tooltip-table" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Add table
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="cyanToBlue" id="deleteTableButton" type="button" data-tooltip-target="tooltip-delete-table" >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h10.5M3 15.5v-4m0 4h11m-11-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5m-18 0h18m0 0v1m-13-1v8m4-8v8m4-8v2m1.8956 5.9528 1.5047-1.5047m0 0 1.5048-1.5048m-1.5048 1.5048 1.4605 1.4604m-1.4605-1.4604-1.4604-1.4605"/>
                </svg>
                <span className="sr-only">Delete table</span>
            </Button>
            <div id="tooltip-delete-table" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Delete table
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="px-1">
                <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            </div>
            <Button outline gradientDuoTone="greenToBlue" id="addColumnBeforeButton" type="button" data-tooltip-target="tooltip-add-column-before">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5.5v14m-8-7h2m0 0h2m-2 0v2m0-2v-2m12 1h-6m6 4h-6m-11 4h16c.5523 0 1-.4477 1-1v-12c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z"/>
                </svg>
                <span className="sr-only">Add column before</span>
            </Button>
            <div id="tooltip-add-column-before" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Add column before
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="purpleToPink" id="addColumnAfterButton" type="button" data-tooltip-target="tooltip-add-column-after" >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5.5v14m8-7h-2m0 0h-2m2 0v2m0-2v-2m-12 1h6m-6 4h6m11 4H4c-.55228 0-1-.4477-1-1v-12c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"/>
                </svg>
                <span className="sr-only">Add column after</span>
            </Button>
            <div id="tooltip-add-column-after" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Add column after
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="pinkToOrange" type="button" data-tooltip-target="tooltip-remove-column" >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5.5v14m-6-8h6m-6 4h6m4.5061-1.4939L15.0123 12.5m0 0 1.5061-1.5061M15.0123 12.5l1.5061 1.5061M15.0123 12.5l-1.5062-1.5061M20 19.5H4c-.55228 0-1-.4477-1-1v-12c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v12c0 .5523-.4477 1-1 1Z"/>
                </svg>
                <span className="sr-only">Remove column</span>
            </Button>
            <div id="tooltip-remove-column" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Remove column
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div className="px-1">
                <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            </div>
            <Button outline gradientDuoTone="tealToLime" id="addRowBeforeButton" type="button" data-tooltip-target="tooltip-add-row-before">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-6-9h2m0 0h2m-2 0v2m0-2v-2"/>
                </svg>
                <span className="sr-only">Add row before</span>
            </Button>
            <div id="tooltip-add-row-before" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Add row before
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="redToYellow" id="addRowAfterButton" type="button" data-tooltip-target="tooltip-add-row-after">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9.5v-3c0-.55228.44772-1 1-1h16c.5523 0 1 .44771 1 1v3m-18 0v9c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-9m-18 0h18m-13 0v-4m4 4v-4m4 4v-4m-6 9h2m0 0h2m-2 0v-2m0 2v2"/>
                </svg>
                <span className="sr-only">Add row after</span>
            </Button>
            <div id="tooltip-add-row-after" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Add row after
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Button outline gradientDuoTone="cyanToBlue" id="removeRowButton" type="button" data-tooltip-target="tooltip-remove-row">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-5.5061-7.4939L12 10.5m0 0 1.5061-1.50614M12 10.5l1.5061 1.5061M12 10.5l-1.5061-1.50614"/>
                </svg>
                <span className="sr-only">Remove row</span>
            </Button>
            <div id="tooltip-remove-row" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Remove row
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </Button.Group>
    </div>
    <Button.Group className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
        <Button outline gradientDuoTone="cyanToBlue" id="mergeCellsButton" type="button" data-tooltip-target="tooltip-merge-cells">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 18.5v2H4v-16h6v2m4 12v2h6v-16h-6v2m-6.49543 8.4954L10 12.5m0 0-2.49543-2.4954M10 12.5H4.05191m12.50199 2.5539L14 12.5m0 0 2.5539-2.55392M14 12.5h5.8319"/>
            </svg>
            <span className="sr-only">Merge cells</span>
        </Button>
        <div id="tooltip-merge-cells" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Merge cells
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="greenToBlue" id="splitCellsButton" type="button" data-tooltip-target="tooltip-split-cells">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 18.5v2h6v-16H4v2m16 12v2h-6v-16h6v2M6.49545 14.9954 4.00003 12.5m0 0 2.49542-2.4954M4.00003 12.5h5.94809m7.49798 2.5539L20 12.5m0 0-2.5539-2.55392M20 12.5h-5.8319"/>
            </svg>
            <span className="sr-only">Split cells</span>
        </Button>
        <div id="tooltip-split-cells" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Split cells
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="purpleToPink" id="mergeOrSplitButton" type="button" data-tooltip-target="tooltip-merge-or-split">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5045 14.9954 21 12.5m0 0-2.4955-2.4954M21 12.5h-5.9481m-9.49798 2.5539L3 12.5m0 0 2.55392-2.55392M3 12.5h5.83192m.16807 7v-14H15v14H8.99999Z"/>
            </svg>
            <span className="sr-only">Merge or split</span>
        </Button>
        <div id="tooltip-merge-or-split" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Merge or split
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="px-1">
            <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
        </div>
        <Button outline gradientDuoTone="pinkToOrange" id="toggleHeaderColumnButton" type="button" data-tooltip-target="tooltip-toggle-header-column" >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5.5v14m6-8h-6m6 4h-6m-9-3h1.99093M4 19.5h16c.5523 0 1-.4477 1-1v-12c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Zm8-7c0 1.1046-.8954 2-2 2-1.10457 0-2-.8954-2-2s.89543-2 2-2c1.1046 0 2 .8954 2 2Z"/>
            </svg>
            <span className="sr-only">Toggle header column</span>
        </Button>
        <div id="tooltip-toggle-header-column" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Toggle header column
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="purpleToBlue" id="toggleHeaderRowButton" type="button" data-tooltip-target="tooltip-toggle-header-row">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-7-9h1.9909M15 10.5c0 1.1046-.8954 2-2 2s-2-.8954-2-2c0-1.10457.8954-2 2-2s2 .89543 2 2Z"/>
            </svg>
            <span className="sr-only">Toggle header row</span>
        </Button>
        <div id="tooltip-toggle-header-row" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Toggle header row
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="purpleToPink" id="toggleHeaderCellButton" type="button" data-tooltip-target="tooltip-toggle-header-cell">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h16c.5523 0 1-.4477 1-1v-3m-18 0v-9c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v9m-18 0h18m-13 0v4m4-4v4m4-4v4m-7-9h1.9909M15 10.5c0 1.1046-.8954 2-2 2s-2-.8954-2-2c0-1.10457.8954-2 2-2s2 .89543 2 2Z"/>
            </svg>
            <span className="sr-only">Toggle header cell</span>
        </Button>
        <div id="tooltip-toggle-header-cell" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Toggle header cell
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <AddAttribute/>
        <Button outline gradientDuoTone="pinkToOrange" id="fixTablesButton" type="button" data-tooltip-target="tooltip-fix-tables">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h4v-4m-5 0v-4m0 4h5m-5-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v1.98935M3 11.5h5v4m9.4708 4.1718-.8696-1.4388-2.8164-.235-2.573-4.2573 1.4873-2.8362 1.4441 2.3893c.3865.6396 1.2183.8447 1.8579.4582.6396-.3866.8447-1.2184.4582-1.858l-1.444-2.38925h3.1353l2.6101 4.27715-1.0713 2.5847.8695 1.4388"/>
            </svg>
            <span className="sr-only">Fix tables</span>
        </Button>
        <div id="tooltip-fix-tables" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Fix tables
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="tealToLime" id="previousCellButton" type="button" data-tooltip-target="tooltip-previous-cell" >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h9.5M3 15.5v-4m0 4h9m-9-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5H3Zm5 0v8m4-8v8m5.9001-1.0999L16 16.5m0 0 1.9001-1.9001M16 16.5h5"/>
            </svg>
            <span className="sr-only">Previous cell</span>
        </Button>
        <div id="tooltip-previous-cell" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Previous cell
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Button outline gradientDuoTone="redToYellow" id="nextCellButton" type="button" data-tooltip-target="tooltip-next-cell" >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h9.5M3 15.5v-4m0 4h9m-9-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v5H3Zm5 0v8m4-8v8m7.0999-1.0999L21 16.5m0 0-1.9001-1.9001M21 16.5h-5"/>
            </svg>
            <span className="sr-only">Next cell</span>
        </Button>
        <div id="tooltip-next-cell" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Next cell
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </Button.Group>
</div>
</div>
}
>
<Button gradientDuoTone="purpleToBlue">
<svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            {`.cls-1 {
              fill: none;
            }`}
          </style>
        </defs>
        <path d="M28,8H24V4a2.0025,2.0025,0,0,0-2-2H4A2.0025,2.0025,0,0,0,2,4V22a2.0025,2.0025,0,0,0,2,2H8v4a2.0025,2.0025,0,0,0,2,2H28a2.0025,2.0025,0,0,0,2-2V10A2.0025,2.0025,0,0,0,28,8ZM22,22H14V17h8Zm0-7H14V10h8ZM12,15H4V10h8ZM22,4V8H4V4ZM4,22V17h8v5Zm24,6H10V24H22a2.0025,2.0025,0,0,0,2-2V10h4Z"/>
        <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" className="cls-1" width="32" height="32"/>
    </svg>
</Button>
</Popover>
</>;
}

