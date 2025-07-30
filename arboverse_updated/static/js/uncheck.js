window.addEventListener('load', function () {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            console.log('Unchecking switches after paint');
            const switches = document.getElementsByClassName('switch');
            for (let i = 0; i < switches.length; i++) {
                let children = switches[i].children;
                for (let j = 0; j < children.length; j++) {
                    if (children[j].checked === true) {
                        console.log('Unchecking:', children[j]);
                        children[j].checked = false;
                    }
                }
            }
        });
    });
});
