
getSearchName("")


/* {{{{{{{{{{{{{{{{{{{{{{{sidebar-sction}}}}}}}}}}}}}}}}}}}}}}} */
let sidebarWidth = $(".side-bar").innerWidth();
$(".sliders").hide(); // Hide without animation initially

$("#sideBtn").click(function () {
    $(".side-bar-col").animate({ left: "250px" }, 500);
    $(".side-bar").animate({ left: 0 }, 500);
    $(".sliders").slideDown(800); // Slide down from bottom to up
    document.querySelector("#sideBtn").classList.add("d-none");
    document.querySelector("#close-sideBtn").classList.remove("d-none");
});

$("#close-sideBtn").click(function () {
    closeSidebar();
});

// Close sidebar when any link inside it is clicked
$(".sliders").click(function () {
    closeSidebar();
});

function closeSidebar() {
    $(".side-bar-col").animate({ left: 0 }, 500);
    $(".side-bar").animate({ left: -sidebarWidth }, 500);
    $(".sliders").slideUp(800); // Slide up to hide
    document.querySelector("#sideBtn").classList.remove("d-none");
    document.querySelector("#close-sideBtn").classList.add("d-none");
}


// let sidebarWidth = $(".side-bar").innerWidth();
// $(".sliders").hide(800)

// $("#sideBtn").click(function () {
//     $(".side-bar-col").animate({ left: "250px" }, 500)
//     $(".side-bar").animate({ left: 0 }, 500)
//     $(".sliders").show(800)
//     document.querySelector("#sideBtn").classList.add("d-none")
//     document.querySelector("#close-sideBtn").classList.remove("d-none");
// })
// $("#close-sideBtn").click(function () {
//     $(".side-bar-col").animate({ left: 0 }, 500)
//     $(".side-bar").animate({ left: -sidebarWidth }, 500)
//     $(".sliders").hide(800)
//     document.querySelector("#sideBtn").classList.remove("d-none")
//     document.querySelector("#close-sideBtn").classList.add("d-none");
// })






/* {{{{{{{{{{{{{{{{{{{{{{{category-sction}}}}}}}}}}}}}}}}}}}}}}} */

async function getCategory() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const result = await response.json();
    console.log(result);
    displayCategory(result.categories);
    // document.querySelectorAll(".meal-cat").forEach((mealCat) => {
    //     mealCat.addEventListener("click", () => {
    //         console.log(document.querySelector(".catFilter").textContent);
    //         getCategoryFilter(mealCat.getAttribute("id"));
    //     })

    // })
}
document.querySelector("#categoryBtn").addEventListener("click", function () {
    document.querySelector("#category-box").classList.remove("d-none")
    document.querySelector("#area-box").classList.add("d-none")
    document.querySelector("#ingredients-box").classList.add("d-none")
    document.querySelector("#formSection").classList.add("d-none")
    document.querySelector("#searchNameRow").classList.add("d-none")
    document.querySelector(".searchContainer").classList.add("d-none")
    document.querySelector("#category-filter").classList.add("d-none")
    document.querySelector("#rowDetails").classList.add("d-none")
    document.querySelector("#area-filter").classList.add("d-none")
    document.querySelector("#ingredients-filter").classList.add("d-none")




    getCategory();
});

function displayCategory(categories) {
    let categoryBox = '';
    console.log(categories);
    for (let i = 0; i < categories.length; i++) {
        categoryBox += `<div id="${categories[i].idCategory}" class="col-lg-3 col-md-4 col-sm-6 meal-cat ">
            <div class="meal-body rounded-3 overflow-hidden position-relative">
                <img class="img-fluid rounded-3" src="${categories[i].strCategoryThumb}" alt="">
                <div class="img-cover position-absolute top-0 bottom-0 start-0 end-0 d-flex flex-column text-center align-items-center">
                    <span class="fs-2 fw-semibold catFilter ms-2">${categories[i].strCategory}</span>
                    <p>${categories[i].strCategoryDescription.substring(0, 100)}</p>
                </div>
            </div>
        </div>`;

        // getCategoryFilter(categories[1].strCategory)

    };

    document.querySelector("#category-box").innerHTML = categoryBox;

    document.querySelectorAll(".meal-cat").forEach((mealCat) => {
        mealCat.addEventListener("click", () => {
            // Get the text content of the .catFilter element inside the clicked mealCat
            const catFilter = mealCat.querySelector(".catFilter").textContent;
            console.log(catFilter);  // Logging the text content to make sure it's correct
            getCategoryFilter(catFilter);  // Pass the category name to getCategoryFilter
        });
    });

}

async function getCategoryFilter(catFilter) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catFilter}`);
    const result = await response.json();
    console.log(result);
    // console.log(result.meals);
    // allMealsCat = result.meals
    // console.log(allMealsCat);
    console.log(catFilter);
    displayCategoryFilter(result.meals)
}

$("#category-box").click(function () {
    console.log("Hello");
    getCategoryFilter()
    document.querySelector("#category-box").classList.add("d-none")
    document.querySelector("#area-box").classList.add("d-none")
    document.querySelector("#ingredients-box").classList.add("d-none")
    document.querySelector("#formSection").classList.add("d-none")
    document.querySelector(".searchContainer").classList.add("d-none")
    document.querySelector("#category-filter").classList.remove("d-none")
    document.querySelector("#searchNameRow").classList.add("d-none")
    document.querySelector("#rowDetails").classList.add("d-none")
    document.querySelector("#area-filter").classList.add("d-none")
    document.querySelector("#ingredients-filter").classList.add("d-none")



})

function displayCategoryFilter(arr) {
    console.log(arr);
    let categoryFilter = ""
    for (let i = 0; i <Math.min(20,arr.length); i++) {
        categoryFilter += `<div role="button" class="col-lg-3 col-md-4 col-sm-6">
                    <div id="${arr[i].idMeal}" class="cat-filter rounded-3 overflow-hidden position-relative catDetails">
                        <img class="img-fluid rounded-3" src="${arr[i].strMealThumb}" alt="">
                        <div
                            class="img-cover  position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center">
                            <span class="fs-2 fw-semibold ms-2">${arr[i].strMeal}</span>        
                        </div>
                    </div>
                </div>`
    }
    document.querySelector("#category-filter").innerHTML = categoryFilter

    document.querySelectorAll(".catDetails").forEach((idDetail) => {
        idDetail.addEventListener("click", () => {
            console.log(idDetail.getAttribute("id"));
            mealsDetails(idDetail.getAttribute("id"));
            document.querySelector("#rowDetails").classList.remove("d-none")
            document.querySelector("#category-filter").classList.add("d-none")

        })

    })
}


/* {{{{{{{{{{{{{{{{{{{{{{{area-sction}}}}}}}}}}}}}}}}}}}}}}} */

async function getAreaList() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const result = await response.json();
    console.log(result.meals);
    displayArea(result.meals)
}


document.querySelector("#area").addEventListener("click", function () {
    document.querySelector("#area-box").classList.remove("d-none")
    document.querySelector("#category-box").classList.add("d-none")
    document.querySelector("#ingredients-box").classList.add("d-none")
    document.querySelector("#formSection").classList.add("d-none")
    document.querySelector(".searchContainer").classList.add("d-none")
    document.querySelector("#category-filter").classList.add("d-none")
    document.querySelector("#searchNameRow").classList.add("d-none")
    document.querySelector("#rowDetails").classList.add("d-none")
    document.querySelector("#area-filter").classList.add("d-none")
    document.querySelector("#ingredients-filter").classList.add("d-none")


    getAreaList()
})

function displayArea(Areas) {
    console.log("hello");
    let areaBox = ``
    for (let i = 0; i < Areas.length; i++) {
        areaBox += `<div role="button" class="col-lg-3 col-md-4 col-sm-6 area-cat">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <i class="fa-solid fa-house-laptop fa-5x text-white"></i>
                                    <span class="fs-2 fw-semibold ms-2 text-white areaFilter">${Areas[i].strArea}</span>
                                </div>
                            </div>`
    }
    document.querySelector("#area-box").innerHTML = areaBox

    document.querySelectorAll(".area-cat").forEach((areaCat) => {
        areaCat.addEventListener("click", () => {
            const areaFilter = areaCat.querySelector(".areaFilter").textContent;
            console.log(areaFilter);
            getAreaFilter(areaFilter);
        });
    });
}

async function getAreaFilter(areaFilter) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaFilter}`);
    const result = await response.json();
    console.log(result.meals);
    displayAreaFilter(result.meals)
}

document.querySelector("#area-box").addEventListener("click", function () {
    document.querySelector("#area-filter").classList.remove("d-none")
    document.querySelector("#category-box").classList.add("d-none")
    document.querySelector("#ingredients-box").classList.add("d-none")
    document.querySelector("#formSection").classList.add("d-none")
    document.querySelector(".searchContainer").classList.add("d-none")
    document.querySelector("#category-filter").classList.add("d-none")
    document.querySelector("#searchNameRow").classList.add("d-none")
    document.querySelector("#rowDetails").classList.add("d-none")
    document.querySelector("#area-box").classList.add("d-none")
    document.querySelector("#ingredients-filter").classList.add("d-none")


    getAreaFilter()
})


function displayAreaFilter(arr) {
    let areaFilterBox = ``
    for (let i = 0; i < Math.min(20,arr.length) ; i++) {
        areaFilterBox += `<div class="col-lg-3 col-md-4 col-sm-6">
                        <div role="button" id="${arr[i].idMeal}" class="meal-body rounded-3 overflow-hidden position-relative areaFood">
                            <img class="img-fluid rounded-3" src="${arr[i].strMealThumb}" alt="">
                            <div
                                class="img-cover  position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center  text-center">
                                <span class="fs-2 fw-semibold ms-2">${arr[i].strMeal}</span>
                                
                            </div>
                        </div>
                    </div>`

    }

    document.querySelector("#area-filter").innerHTML = areaFilterBox


    document.querySelectorAll(".areaFood").forEach((idDetail) => {
        idDetail.addEventListener("click", () => {
            console.log(idDetail.getAttribute("id"));
            mealsDetails(idDetail.getAttribute("id"));
            document.querySelector("#rowDetails").classList.remove("d-none")
            document.querySelector("#area-filter").classList.add("d-none")

        })

    })
}



/* {{{{{{{{{{{{{{{{{{{{{{{ingredients-sction}}}}}}}}}}}}}}}}}}}}}}} */

async function getIngredients() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const result = await response.json();
    console.log(result.meals);
    displayIngredients(result.meals)

}

document.querySelector("#igredients").addEventListener("click", function () {
    document.querySelector("#ingredients-box").classList.remove("d-none")
    document.querySelector("#category-box").classList.add("d-none")
    document.querySelector("#area-box").classList.add("d-none")
    document.querySelector("#formSection").classList.add("d-none")
    document.querySelector(".searchContainer").classList.add("d-none")
    document.querySelector("#category-filter").classList.add("d-none")
    document.querySelector("#searchNameRow").classList.add("d-none")
    document.querySelector("#rowDetails").classList.add("d-none")
    document.querySelector("#area-filter").classList.add("d-none")
    document.querySelector("#ingredients-filter").classList.add("d-none")

    getIngredients()
})

function displayIngredients(ingredientsList) {
    let ingredients = ``

    for (let i = 0; i < Math.min(20, ingredientsList.length); i++) {
        let description = '';
        if (ingredientsList[i].strDescription !== null) {
            description = ingredientsList[i].strDescription.split('null').join('');
        } else {
            description = '';
        } ingredients += `<div id="${ingredientsList[i].idIngredient}" role="button" class="col-lg-3 col-md-4 col-sm-6 ingredientCards">
                    <div class="d-flex flex-column align-items-center text-center">
                        <i class="fa-solid fa-drumstick-bite fa-5x text-white"></i>
                        <span class="fs-2 fw-semibold ms-2 text-white ingredStr">${ingredientsList[i].strIngredient}</span>
                        <p class="text-white">${description.substring(0, 100)}</p>
                    </div>
                </div>`

    }
    document.querySelector("#ingredients-box").innerHTML = ingredients

    document.querySelectorAll(".ingredientCards").forEach((ingredFilter) => {
        ingredFilter.addEventListener("click", () => {
            const ingredStr = ingredFilter.querySelector(".ingredStr").textContent;
            console.log(ingredStr);
            getIngredientsFilter(ingredStr);
        });
    });
}



document.querySelector("#ingredients-box").addEventListener("click", function () {
    document.querySelector("#ingredients-filter").classList.remove("d-none")
    document.querySelector("#area-filter").classList.add("d-none")
    document.querySelector("#category-box").classList.add("d-none")
    document.querySelector("#ingredients-box").classList.add("d-none")
    document.querySelector("#formSection").classList.add("d-none")
    document.querySelector(".searchContainer").classList.add("d-none")
    document.querySelector("#category-filter").classList.add("d-none")
    document.querySelector("#searchNameRow").classList.add("d-none")
    document.querySelector("#rowDetails").classList.add("d-none")
    document.querySelector("#area-box").classList.add("d-none")

    getIngredientsFilter()
})

async function getIngredientsFilter(ingredStr) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredStr}`);
    const result = await response.json();
    console.log(result.meals);
    displayIngredientsFilter(result.meals)

}

function displayIngredientsFilter(arr) {
    let ingredFilterBox = ``
    for (let i = 0; i < Math.min(20,arr.length) ; i++) {
        ingredFilterBox += `<div class="col-lg-3 col-md-4 col-sm-6">
                        <div role="button" id="${arr[i].idMeal}" class="meal-body rounded-3 overflow-hidden position-relative ingredMeals">
                            <img class="img-fluid rounded-3" src="${arr[i].strMealThumb}" alt="">
                            <div
                                class="img-cover  position-absolute top-0 bottom-0 start-0 end-0 d-flex d-flex align-items-center  text-center">
                                <span class="fs-2 fw-semibold ms-2">${arr[i].strMeal}</span>
                                
                            </div>
                        </div>
                    </div>`
    }
    document.querySelector("#ingredients-filter").innerHTML = ingredFilterBox


    document.querySelectorAll(".ingredMeals").forEach((idDetail) => {
        idDetail.addEventListener("click", () => {
            console.log(idDetail.getAttribute("id"));
            mealsDetails(idDetail.getAttribute("id"));
            document.querySelector("#rowDetails").classList.remove("d-none")
            document.querySelector("#ingredients-filter").classList.add("d-none")

        })

    })
}

/* {{{{{{{{{{{{{{{{{{{{{{{form-sction}}}}}}}}}}}}}}}}}}}}}}} */

let enterName = document.querySelector("#enterName")
let enterPhone = document.querySelector("#enterPhone")
let enterPassword = document.querySelector("#enterPassword")
let enterEmail = document.querySelector("#enterEmail")
let enterAge = document.querySelector("#enterAge")
let reEnterPassword = document.querySelector("#reEnterPassword")

let nameError = document.querySelector("#nameError")
let phoneError = document.querySelector("#phoneError")
let passwordError = document.querySelector("#passwordError")
let emailError = document.querySelector("#emailError")
let ageError = document.querySelector("#ageError")
let reEnterPasswordError = document.querySelector("#reEnterPasswordError")
let submitBtn = document.querySelector("#submitBtn")

enterName.addEventListener("input", function () {
    validateName()
})

function validateName() {
    let nameRgx = /^[a-zA-Z]{1,15}$/
    if (nameRgx.test(enterName.value) == true) {
        nameError.classList.add("d-none")

        return true
    }
    else {
        nameError.classList.remove("d-none")

    }
}

enterPhone.addEventListener("input", function () {
    validatePhone()
})

function validatePhone() {
    let phoneRgx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (phoneRgx.test(enterPhone.value) == true) {
        phoneError.classList.add("d-none")
        return true
    }
    else {
        phoneError.classList.remove("d-none")

    }
}

enterPassword.addEventListener("input", function () {
    validatePassword()
})

function validatePassword() {
    let passwordRgx = /^(?=.*\d)[a-zA-Z0-9]{8,}$/
    if (passwordRgx.test(enterPassword.value) == true) {
        passwordError.classList.add("d-none")
        return true
    }
    else {
        passwordError.classList.remove("d-none")

    }
}
reEnterPassword.addEventListener("input", function () {
    validatRePassword()
})

function validatRePassword() {
    if (reEnterPassword.value !== enterPassword.value) {
        reEnterPasswordError.classList.remove("d-none")
        return false
    }
    else {
        reEnterPasswordError.classList.add("d-none")
        return true
    }
}

enterEmail.addEventListener("input", function () {
    validateEmail()
})

function validateEmail() {
    let emailRgx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    if (emailRgx.test(enterEmail.value) == true) {
        emailError.classList.add("d-none")
        return true
    }
    else {
        emailError.classList.remove("d-none")

    }
}

enterAge.addEventListener("input", function () {
    validateAge()
})

function validateAge() {
    let ageRgx = /^(?:1[01]\d|[1-9]?\d)$/
    if (ageRgx.test(enterAge.value) == true) {
        ageError.classList.add("d-none")
        return true
    }
    else {
        ageError.classList.remove("d-none")
    }
}

function submit() {
    if (validateName() && validatePhone() && validatePassword() && validateEmail() && validateAge() && validatRePassword()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", "true");
    }
}

document.querySelector("body").addEventListener("keyup", function () {
    submit();
});

$("#contact").click(function () {
    document.querySelector("#formSection").classList.remove("d-none")
    document.querySelector("#category-box").classList.add("d-none")
    document.querySelector("#area-box").classList.add("d-none")
    document.querySelector("#ingredients-box").classList.add("d-none")
    document.querySelector("#category-filter").classList.add("d-none")
    document.querySelector(".searchContainer").classList.add("d-none")
    document.querySelector("#searchNameRow").classList.add("d-none")
    document.querySelector("#rowDetails").classList.add("d-none")
    document.querySelector("#area-filter").classList.add("d-none")
    document.querySelector("#ingredients-filter").classList.add("d-none")




})

/* {{{{{{{{{{{{{{{{{{{{{{{search-sction}}}}}}}}}}}}}}}}}}}}}}} */
let searchName = document.querySelector("#searchName")
let searchLetter = document.querySelector("#searchLetter")

document.querySelector("#search").addEventListener("click", function () {
    document.querySelector(".searchContainer").classList.remove("d-none")
    document.querySelector("#category-box").classList.add("d-none")
    document.querySelector("#area-box").classList.add("d-none")
    document.querySelector("#ingredients-box").classList.add("d-none")
    document.querySelector("#category-filter").classList.add("d-none")
    document.querySelector("#formSection").classList.add("d-none")
    document.querySelector("#rowDetails").classList.add("d-none")
    document.querySelector("#area-filter").classList.add("d-none")
    document.querySelector("#ingredients-filter").classList.add("d-none")
    document.querySelector("#searchNameRow").classList.add("d-none")
})

searchName.addEventListener("input", function () {
    getSearchName(searchName.value)
    document.querySelector("#searchNameRow").classList.remove("d-none")
})

async function getSearchName(mealName) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    const result = await response.json();
    console.log(result.meals);
    displaySearchName(result.meals)
    document.querySelectorAll(".searchNameDiv").forEach((idDetail) => {
        idDetail.addEventListener("click", () => {
            console.log(idDetail.getAttribute("id"));
            mealsDetails(idDetail.getAttribute("id"));
            document.querySelector("#rowDetails").classList.remove("d-none")
            document.querySelector(".searchContainer").classList.add("d-none")
            document.querySelector("#searchNameRow").classList.add("d-none")

        })

    })

}
function displaySearchName(arr) {
    let searchNameBox = ``
    for (let i = 0; i < arr.length; i++) {
        searchNameBox += `<div id="${arr[i].idMeal}" role="button" class="col-lg-3 col-md-4 col-sm-6 searchNameDiv">
                <div class="meal-body rounded-3 overflow-hidden position-relative">
                    <img class="img-fluid rounded-3" src="${arr[i].strMealThumb}" alt="">
                    <div
                        class="img-cover  position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center">
                        <span class="fs-2 fw-semibold ms-2">${arr[i].strMeal}</span>
                    </div>
                </div>
            </div>`
    }
    document.querySelector("#searchNameRow").innerHTML = searchNameBox
}





searchLetter.addEventListener("input", function () {
    getSearchLetter(searchLetter.value)
    document.querySelector("#searchNameRow").classList.remove("d-none")

})

async function getSearchLetter(mealLetter) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`);
    const result = await response.json();
    console.log(result.meals);
    displaySearchLetter(result.meals)
    document.querySelectorAll(".searchNameDiv").forEach((idDetail) => {
        idDetail.addEventListener("click", () => {
            console.log(idDetail.getAttribute("id"));
            mealsDetails(idDetail.getAttribute("id"));
            document.querySelector("#rowDetails").classList.remove("d-none")
            document.querySelector(".searchContainer").classList.add("d-none")
            document.querySelector("#searchNameRow").classList.add("d-none")

        })

    })
}

function displaySearchLetter(arr) {
    let searchLetterBox = ``
    for (let i = 0; i < arr.length; i++) {
        searchLetterBox += `<div id="${arr[i].idMeal}" role="button" class="col-lg-3 col-md-4 col-sm-6 searchNameDiv idDetail">
                <div class="meal-body rounded-3 overflow-hidden position-relative">
                    <img class="img-fluid rounded-3" src="${arr[i].strMealThumb}" alt="">
                    <div
                        class="img-cover  position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center">
                        <span class="fs-2 fw-semibold ms-2">${arr[i].strMeal}</span>
                    </div>
                </div>
            </div>`
    }


    document.querySelector("#searchNameRow").innerHTML = searchLetterBox
}

/* {{{{{{{{{{{{{{{{{{{{{{{details-sction}}}}}}}}}}}}}}}}}}}}}}} */
async function mealsDetails(id) {
    console.log("hello");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    console.log(result.meals);
    displayDetails(result.meals)
}




function displayDetails(details) {
    let detailsBox = `<div class="col-lg-4">
                            <img class="img-fluid rounded-3" src="${details[0].strMealThumb}" alt="">
                            <span class="text-white fs-2">${details[0].strMeal}</span>
                        </div>
                        <div class="col-lg-8 text-white">
                            <h2>Instructions</h2>
                            <p>${details[0].strInstructions}</p>
                            <h3>Area : <span>${details[0].strArea}</span></h3>
                            <h3>Category : <span>${details[0].strCategory}</span></h3>
                            <h3>Recipes :</h3>
                            <ul id="recipesDetails" class="list-unstyled d-flex g-3 flex-wrap">`;
    for (let i = 1; i <= 20; i++) {
        let ingredient = details[0][`strIngredient${i}`];
        let measurement = details[0][`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "" && measurement && measurement.trim() !== "") {
            detailsBox += `<li class="alert alert-info m-2 p-1">${ingredient}: ${measurement}</li>`;
        }

        // for (let i = 1; i <= 20; i++) {
        //     let ingredients = details[0][`strIngredient${i}`];
        //     if (ingredients && ingredients.trim() !== "") {
        //         detailsBox += `<li class="alert alert-info m-2 p-1">${ingredients}</li>`;
        //     }
    }
    detailsBox += `</ul>
                        <h3>Tags :</h3>
                        <ul id="tagsDetails" class="list-unstyled d-flex g-3 flex-wrap">`;
    if (details[0].strTags) {
        let tags = details[0].strTags.split(',');
        for (let tag of tags) {
            if (tag.trim() !== "") {
                detailsBox += `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`;
            }
        }
    }
    detailsBox += `</ul>
                        <a href="${details[0].strSource}" target="_blank" class="btn btn-success">Source</a>
                        <a href="${details[0].strYoutube}" target="_blank" class="btn btn-danger">YouTube</a>
                    </div>`;

    document.querySelector("#rowDetails").innerHTML = detailsBox;
}
