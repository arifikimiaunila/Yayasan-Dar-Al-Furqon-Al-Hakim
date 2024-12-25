import { Button, Modal, FloatingLabel} from "flowbite-react";
import { ReactNode, useState } from "react";

export function AddAttribute(): ReactNode{
const [openModal, setOpenModal] = useState(true);
function onCloseModal() {
    setOpenModal(false);
}
return
<>
<Button onClick={() => setOpenModal(true)} data-modal-toggle="cell-attribute-modal" data-modal-target="cell-attribute-modal" data-tooltip-target="tooltip-add-cell-attribute">        
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15.5v3c0 .5523.44772 1 1 1h8v-8m-9 4v-4m0 4h9m-9-4v-5c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v4m-18 1h11m6.25 5c0 1.2426-1.0073 2.25-2.25 2.25m2.25-2.25c0-1.2426-1.0073-2.25-2.25-2.25m2.25 2.25H21m-3 2.25c-1.2426 0-2.25-1.0074-2.25-2.25M18 18.75v.75m-2.25-3c0-1.2426 1.0074-2.25 2.25-2.25m-2.25 2.25H15m3-2.25v-.75m-1.591 1.409-.5303-.5303m4.2426 4.2426-.5303-.5303m-3.182 0-.5303.5303m4.2426-4.2426-.5303.5303"/>
    </svg>
    <span className="sr-only">Add cell attribute</span>
</Button>
<div id="tooltip-add-cell-attribute" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
Add cell attribute
<div className="tooltip-arrow" data-popper-arrow></div>
</div>
<div className="px-1">
<span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
</div>
<Modal id="cell-attribute-modal" tabIndex={-1} aria-hidden="true" show={openModal} size="md" popup onClose={onCloseModal}>
<Modal.Header>
            Add cell attribute
</Modal.Header>
<Modal.Body id="addCellAttributeForm" >
<div className="space-y-6">  
    <FloatingLabel variant="filled" label="Attribute name" type="text" name="attribute-name" id="attribute-name" helperText="eg. backgroundColor" />
    <FloatingLabel variant="filled" label="Attribute value" type="text" name="attribute-value" id="attribute-value" helperText="eg. #E1EFFE;" />
    <Button color="blue" type="submit" id="addCellAttributeButton" >Set attribute</Button>
    </div>
</Modal.Body>
</Modal>
</>;
}