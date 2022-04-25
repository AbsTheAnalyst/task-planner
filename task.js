window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
        if(!task){
                Swal.fire({
                  title: 'Blank',
                    text:'Blank task cannot be created',
                    icon:'warning',
                    showCloseButton: true,
                  confirmButtonText: 'OK ',
                    width:280,
                    height:300,
                })
            return;
        }
        else{		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
            Swal.fire({
                          title: 'Delete this task ?',
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: 'Yes',
                          showCloseButton: true,
                          denyButtonText: 'No',
                          customClass: {
                            actions: 'my-actions',
                            cancelButton: 'order-1 right-gap',
                            confirmButton: 'order-2',
                            denyButton: 'order-3',
                            
                          }
                        }).then((result) => {
                          if (result.isConfirmed) {
                              list_el.removeChild(task_el);
                            Swal.fire({title: "Done.",text: "Deleted..",icon:"success",timer: 1000,width: 250})
                          } else if (result.isDenied) {
                            Swal.fire('Not Remvoed', '', 'info')
                          }
                        })
			
		});
            }
        

	});
});
