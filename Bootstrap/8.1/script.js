var toolTips = document.querySelectorAll('[data-bs-toggle="tooltip"]');

toolTips.forEach(function(el){
    new bootstrap.Tooltip(el);
});

(()=>{
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form=>{
        form.addEventListener('submit', event=>{
            if(!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();