/* 클래스  */
class FolderPathC {
    constructor(options) {
        options = {
            elem: document.querySelector(".folderpath-content"),
            viewType: 0,
            arPath: [],
            template: `<span class="path-item">
    <span class="path-item-str"></span>
    <i class="fas fa-angle-right"></i></span>`,
            ...options,
        };
        this.init(options);
    }

    init(options) {
        this.__elem = options.elem;
        this.__viewType = options.viewType;
        this.__arPath = options.arPath;
        this.__template = options.template;
    }

    set viewType(num) {
        this.__viewType = num;
    }

    set arPath(str) {
        if (!str) {
            alert("잘못된 입력");
            return;
        }
        this.__arPath = str.split("\\").filter(function (s) {
            return s;
        });
    }

    get arPathLength() {
        return this.__arPath.length;
    }

    get activePathEl() {
        return this.__elem.querySelector(".path-item[active]");
    }
    get pathEls() {
        /* 개념 확실히 숙지할것  */
        return Array.prototype.slice.call(
            this.__elem.querySelectorAll(".path-item")
        );
    }

    createPath(str) {
        this.arPath = str;
        this.clearPath();
        for (let i = 0; i < this.arPathLength; i++) {
            this.addPath(this.__arPath[i]);
        }
    }

    createNewPathItemEl() {
        const div = document.createElement("div");
        div.innerHTML = this.__template;
        return div.firstElementChild;
    }

    updatePathItem(pathEl, str) {
        pathEl.querySelector(".path-item-str").textContent = str;
        // this.setupStyle(pathEl); // 아이템 레이아웃 설정
    }
    // setupStyle(pathEl){
    //     pathEl.style.s
    // }

    setPathClickEventListener(pathEl) {
        pathEl.addEventListener("click", (_) => this.selectPath(pathEl));
    }

    selectPath(pathEl) {
        let viewtype = this.__viewType;
        this.removePathActive();
        switch (viewtype) {
            case 0:
                this.addPathActive(pathEl);
                break;
            case 1:
                this.removePath(pathEl);
                break;
            //case 2,3...:
        }
    }

    addPathActive(pathEl) {
        pathEl && pathEl.setAttribute("active", ""); //새로 active 설정
    }

    removePathActive() {
        const activePathEl = this.activePathEl;
        activePathEl && activePathEl.removeAttribute("active");
    }

    removePath(pathEl) {
        while (pathEl.nextElementSibling) {
            pathEl.parentNode.removeChild(pathEl.nextElementSibling);
        }
    }

    addPath(str) {
        const pathEl = this.createNewPathItemEl();
        this.__elem.appendChild(pathEl);
        this.updatePathItem(pathEl, str);
        this.setPathClickEventListener(pathEl);
    }

    clearPath() {
        while (this.__elem.hasChildNodes()) {
            this.__elem.firstChild.remove();
        }
    }
}

/* 실행 코드 */
let viewType = 0;

let el = document.querySelector(".folderpath-content"),
    folderPath = new FolderPathC({ elem: el });

document
    .querySelector("button[data-create-path]")
    .addEventListener("click", function () {
        let input = document.querySelector("input[data-path-input]").value;
        folderPath.createPath(input);
    });

document
    .querySelector("input[data-view-type]")
    .addEventListener("click", function () {
        viewType = viewType == 1 ? 0 : ++viewType;
        folderPath.viewType = viewType;
    });

let html = document.documentElement;
document.documentElement.setAttribute("data-theme", localStorage.theme);

document
    .querySelector("button[data-set-theme]")
    .addEventListener("click", (e) => {
        let { target } = e,
            newTheme = target.getAttribute("data-set-theme");
        if (newTheme == "dark") {
            target.setAttribute("data-set-theme", "light");
            target.textContent = "Light Mode";
        } else {
            target.setAttribute("data-set-theme", "dark");
            target.textContent = "Dark Mode";
        }
        if (newTheme) {
            html.setAttribute("data-theme", newTheme);
            localStorage.theme = newTheme;
        }
    });

// /* 프로토타입 */
// function FolderPathF(options) {
//     this.option(options);
// }

// let proto = FolderPathF.prototype;

// proto.option = function (options) {
//     this.__elem = options.elem || document.querySelector(".folderpath-content");
//     this.__viewType = options.viewType || 0;
//     this.__arPath = options.arPath || [];
//     this.__template =
//         options.template ||
//         '<span class="path-item"><span class="path-item-str"></span><i class="fas fa-angle-right"></i></span>';
// };
// proto.setarPath = function (str) {
//     if (!str) {
//         alert("잘못된 입력");
//         return;
//     }
//     this.__arPath = str.split("\\").filter(function (s) {
//         return s;
//     });
// };

// proto.setviewType = function (num) {
//     this.__viewType = num;
// };

// proto.getarPathLength = function () {
//     return this.__arPath.length;
// };

// proto.getactivePathEl = function () {
//     return this.__elem.querySelector(".path-item[active]");
// };

// proto.getpathEls = function () {
//     /* 개념 확실히 숙지할것  */
//     let arItem;
//     let NodesItem = this.elem.querySelectorAll(".path-item");
//     for (let i = 0; i < NodesItem.length; i++) {
//         arItem.push(NodesItem[i]);
//     }
//     return arItem;
// };

// proto.createPath = function (str) {
//     this.setarPath(str);
//     this.clearPath();
//     for (let i = 0; i < this.getarPathLength(); i++) {
//         this.addPath(this.__arPath[i]);
//     }
// };

// proto.createNewPathItemEl = function () {
//     const div = document.createElement("div");
//     div.innerHTML = this.__template;
//     return div.firstElementChild;
// };

// proto.updatePathItem = function (pathEl, str) {
//     pathEl.querySelector(".path-item-str").textContent = str;
// };

// proto.setPathClickEventListener = function (pathEl) {
//     pathEl.addEventListener("click", this.selectPath.bind(this, pathEl));
// };

// proto.selectPath = function (pathEl) {
//     let viewtype = this.__viewType;
//     this.removePathActive();
//     switch (viewtype) {
//         case 0:
//             this.addPathActive(pathEl);
//             break;
//         case 1:
//             this.removePath(pathEl);
//             break;
//         //case 2,3...:
//     }
// };

// proto.addPathActive = function (pathEl) {
//     pathEl && pathEl.setAttribute("active", ""); //새로 active 설정
// };

// proto.removePathActive = function () {
//     debugger;
//     const activePathEl = this.getactivePathEl();
//     activePathEl && activePathEl.removeAttribute("active");
// };

// proto.removePath = function (pathEl) {
//     debugger;
//     while (pathEl.nextElementSibling) {
//         pathEl.parentNode.removeChild(pathEl.nextElementSibling);
//     }
// };

// proto.addPath = function (str) {
//     const pathEl = this.createNewPathItemEl();
//     this.__elem.appendChild(pathEl);
//     this.updatePathItem(pathEl, str);
//     this.setPathClickEventListener(pathEl);
// };

// proto.clearPath = function () {
//     while (this.__elem.hasChildNodes()) {
//         this.__elem.removeChild(this.__elem.firstElementChild);
//     }
// };

// /* 실행 코드 */
// let viewType = 0;

// let el = document.querySelector(".folderpath-content"),
//     folderPath = new FolderPathF({ elem: el });

// document
//     .querySelector("button[data-create-path]")
//     .addEventListener("click", function () {
//         let input = document.querySelector("input[data-path-input]").value;
//         folderPath.createPath(input);
//     });

// document
//     .querySelector("input[data-view-type]")
//     .addEventListener("click", function () {
//         viewType = viewType == 1 ? 0 : ++viewType;
//         folderPath.setviewType(viewType);
//     });

// let html = document.documentElement;
// document.documentElement.setAttribute("data-theme", localStorage.theme);

// document
//     .querySelector("button[data-set-theme]")
//     .addEventListener("click", function (e) {
//         let target = e.target,
//             newTheme = target.getAttribute("data-set-theme");
//         if (newTheme == "dark") {
//             target.setAttribute("data-set-theme", "light");
//             target.textContent = "Light Mode";
//         } else {
//             target.setAttribute("data-set-theme", "dark");
//             target.textContent = "Dark Mode";
//         }
//         if (newTheme) {
//             html.setAttribute("data-theme", newTheme);
//             localStorage.theme = newTheme;
//         }
//     });
