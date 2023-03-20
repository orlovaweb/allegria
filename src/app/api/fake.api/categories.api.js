export const categories = {
    clothes: { _id: "67rdca3eeb7f6fgeed471818", name: "Одежда" },
    shoose: { _id: "67rdca3eeb7f6fgeed471820", name: "Обувь" },
    bags: { _id: "67rdca3eeb7f6fgeed471814", name: "Сумки" },
    acsessories: { _id: "67rdca3eeb7f6fgeed471822", name: "Аксессуары" },
    underwear: { _id: "67rdca3eeb7f6fgeed471824", name: "Белье" }
};

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(categories);
        }, 50);
    });

export default {
    fetchAll
};