import { categories } from "./categories.api";
const brands = {
    americanVintage: { _id: "67rdca3eeb7f6fgeed479824", name: "American vintage" },
    georgeGinaLucy: { _id: "67rdca3eeb7f6fgeed479825", name: "George Gina Lucy" },
    deha: { _id: "67rdca3eeb7f6fgeed479826", name: "Deha" },
    birkenstock: { _id: "67rdca3eeb7f6fgeed479827", name: "Birkenstock" },
};
const sizes = {
    xs: {
        _id: "67rdca3eeb7f6fgeed471198",
        name: "XS"
    },
    s: {
        _id: "67rdca3eeb7f6fgeed471100",
        name: "S"
    },
    m: {
        _id: "67rdca3eeb7f6fgeed4711012",
        name: "M"
    },
    l: {
        _id: "67rdca3eeb7f6fgeed471101",
        name: "L"
    },
    xl: {
        _id: "67rdca3eeb7f6fgeed471102",
        name: "XL"
    },
    xxl: {
        _id: "67rdca3eeb7f6fgeed471103",
        name: "XXL"
    },
    36: {
        _id: "67rdca3eeb7f6fgeed471104",
        name: "36"
    },
    37: {
        _id: "67rdca3eeb7f6fgeed471105",
        name: "37"
    },
    38: {
        _id: "67rdca3eeb7f6fgeed471106",
        name: "38"
    },
    39: {
        _id: "67rdca3eeb7f6fgeed471107",
        name: "39"
    },
    40: {
        _id: "67rdca3eeb7f6fgeed471108",
        name: "40"
    },
    41: {
        _id: "67rdca3eeb7f6fgeed471109",
        name: "41"
    },
    42: {
        _id: "67rdca3eeb7f6fgeed471110",
        name: "42"
    }
};

const goods = [
    {
        _id: "67rdca3eeb7f6fgeed471815",
        img: "blouse.jpg",
        name: "Блузка",
        category: categories.clothes,
        sizes: [sizes.s, sizes.m, sizes.l],
        brand: brands.americanVintage,
        bookmark: false,
        shortDescription: "Classic Shirt",
        longDescription: "Рубашка классическая. Изготовлена из натурального хлопка",
        price: 2500,
        discount: 60
    },
    {
        _id: "67rdca3eeb7f6fgeed471816",
        img: "shirt.jpg",
        name: "Рубашка",
        category: categories.clothes,
        sizes: [sizes.s, sizes.m, sizes.l, sizes.xl, sizes.xxl],
        brand: brands.deha,
        bookmark: false,
        shortDescription: "Classic Shirt",
        longDescription: "Рубашка классическая. Изготовлена из натурального хлопка",
        price: 2500,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471817",
        img: "trouses.jpg",
        name: "Брюки",
        category: categories.clothes,
        sizes: [sizes.l, sizes.xl, sizes.xxl],
        brand: brands.georgeGinaLucy,
        bookmark: false,
        shortDescription: "Classic Trousers",
        longDescription: "Брюки классические. Изготовлены из натурального хлопка",
        price: 2500,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471818",
        img: "sandal.jpg",
        name: "Сандали",
        category: categories.shoose,
        sizes: [sizes[36], sizes[37], sizes[38]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Shoose",
        longDescription: "Сандали классические. Изготовлены из натуральных материалов.",
        price: 5500,
        discount: 80
    },
    {
        _id: "67rdca3eeb7f6fgeed471819",
        img: "sandal2.jpg",
        name: "Босоножки",
        category: categories.shoose,
        sizes: [sizes[38], sizes[39], sizes[40], sizes[41], sizes[42]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Shoose",
        longDescription: "Босоножки классические. Изготовлены из натуральных материалов.",
        price: 5500,
        discount: 50
    },
    {
        _id: "67rdca3eeb7f6fgeed471825",
        img: "sneakers.jpg",
        name: "Кроссовки",
        category: categories.shoose,
        sizes: [sizes[38], sizes[39], sizes[40], sizes[41], sizes[42]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Shoose",
        longDescription: "Кроссовки классические. Изготовлены из натуральных материалов.",
        price: 3500,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471820",
        img: "bag.jpg",
        name: "Сумка",
        category: categories.bags,
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Bag",
        longDescription: "Сумка повседневная",
        price: 4500,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471821",
        img: "acsess.jpg",
        name: "Украшение на голову",
        category: categories.acsessories,
        brand: brands.deha,
        bookmark: false,
        shortDescription: "Head acsessories",
        longDescription: "Украшение на голову праздничное с узорами. Включает в себя камни из циркония",
        price: 3000,
        discount: 90
    },
    {
        _id: "67rdca3eeb7f6fgeed471822",
        img: "band.jpg",
        name: "Повязка на голову",
        category: categories.acsessories,
        brand: brands.americanVintage,
        bookmark: false,
        shortDescription: "Head acsessories",
        longDescription: "Повязка на голову с узорами.",
        price: 1000,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471823",
        img: "bra.jpg",
        name: "Бюстгалтер",
        category: categories.underwear,
        brand: brands.americanVintage,
        sizes: [sizes.l, sizes.xl, sizes.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Бюстгалтер кружевной",
        price: 2000,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471824",
        img: "set1.jpg",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizes.xs, sizes.s, sizes.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Комплект нижнего белья",
        price: 1600,
        discount: 10
    },
    {
        _id: "67rdca3eeb7f6fgeed471826",
        img: "set2.jpg",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizes.xs, sizes.s, sizes.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Комплект нижнего белья",
        price: 1600,
        discount: 10
    },

];


const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(goods);
        }, 2000);

    });
const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(goods.find((product) => product._id === id));
        }, 1000);
    });
export default {
    fetchAll, getById
};
