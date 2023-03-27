import { categories } from "./categories.api";
const brands = {
    americanVintage: { _id: "67rdca3eeb7f6fgeed479824", name: "American vintage" },
    georgeGinaLucy: { _id: "67rdca3eeb7f6fgeed479825", name: "George Gina Lucy" },
    deha: { _id: "67rdca3eeb7f6fgeed479826", name: "Deha" },
    birkenstock: { _id: "67rdca3eeb7f6fgeed479827", name: "Birkenstock" },
};
export const sizesCloth = {
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
    }
};
export const sizesShoes = {
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
        img: "blouse.webp",
        name: "Блузка",
        category: categories.clothes,
        sizes: [sizesCloth.s, sizesCloth.m, sizesCloth.l],
        brand: brands.americanVintage,
        bookmark: false,
        shortDescription: "Classic Shirt",
        longDescription: "Стильная женская шелковая блузка с V-образным вырезом. Легко сочетается с другими вещами: с брюками, джинсами и юбками. ",
        price: 2500,
        discount: 60,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471816",
        img: "shirt.webp",
        name: "Рубашка",
        category: categories.clothes,
        sizes: [sizesCloth.s, sizesCloth.m, sizesCloth.l, sizesCloth.xl, sizesCloth.xxl],
        brand: brands.deha,
        bookmark: false,
        shortDescription: "Classic Shirt",
        longDescription: "Дышащая ткань батист приятна к телу, легко разглаживается, прочная. Прямой крой не сковывает движения, в ней будет комфортно в течение всего дня. ",
        price: 2500,
        discount: 0,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471817",
        img: "trouses.webp",
        name: "Брюки",
        category: categories.clothes,
        sizes: [sizesCloth.l, sizesCloth.xl, sizesCloth.xxl],
        brand: brands.georgeGinaLucy,
        bookmark: false,
        shortDescription: "Classic Trousers",
        longDescription: "Джоггеры женские с высокой талией  - это теплые спортивные штаны прямого свободного кроя. Имеют внутренние карманы, пояс и нижнюю часть штанин на резинке. ",
        price: 2500,
        discount: 0,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471818",
        img: "sandal.webp",
        name: "Сандали",
        category: categories.shoose,
        sizes: [sizesShoes[36], sizesShoes[37], sizesShoes[38]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Shoose",
        longDescription: "Босоножки из натуральной кожи черного цвета, люксовой линейки бренда. Верх модели выполнен из кожаных, тонких ремешков украшенных камнем.",
        price: 5500,
        discount: 80,
        shoes: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471819",
        img: "sandal2.webp",
        name: "Босоножки",
        category: categories.shoose,
        sizes: [sizesShoes[38], sizesShoes[39], sizesShoes[40], sizesShoes[41], sizesShoes[42]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Shoose",
        longDescription: "Шлепанцы бренда BIRKENSTOCK выполнены из искусственной кожи. Женские пантолеты практически не ощущаются на ноге, поэтому комфорт на весь день вам обеспечен.",
        price: 5500,
        discount: 50,
        shoes: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471825",
        img: "sneakers.webp",
        name: "Кроссовки",
        category: categories.shoose,
        sizes: [sizesShoes[38], sizesShoes[39], sizesShoes[40], sizesShoes[41], sizesShoes[42]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Кроссовки Respect",
        longDescription: "Универсальным решением для повседневных образов являются  кроссовки Respect. При изготовлении используется качественный материал, который комфортно ощущается на ноге.",
        price: 3500,
        discount: 0,
        shoes: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471820",
        img: "bag.webp",
        name: "Сумка",
        category: categories.bags,
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Bag",
        longDescription: "Миниатюрная каркасная женская сумка в форме трапеции может использоваться как с повседневным образами, так и для вечерних мероприятий. В производстве сумки была использована натуральная кожа - практичный и прочный материал, сохраняющий свои свойства независимо от погоды и частоты использования.",
        price: 4500,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471821",
        img: "acsess.webp",
        name: "Украшение на голову",
        category: categories.acsessories,
        brand: brands.deha,
        bookmark: false,
        shortDescription: "Head acsessories",
        longDescription: "Декоративная веточка на голову украсит нежный образ невесты или другой нарядный вариант для девушки, женщины, девочки. Нарядное украшение в волосы выполнено из жемчужных бусин – имитация натурального жемчуга, кристаллов, страз и бисера. Заколка – крокодильчик отлично подходит для фиксации прически.",
        price: 3000,
        discount: 90
    },
    {
        _id: "67rdca3eeb7f6fgeed471822",
        img: "band.webp",
        name: "Повязка на голову",
        category: categories.acsessories,
        brand: brands.americanVintage,
        bookmark: false,
        shortDescription: "Head acsessories",
        longDescription: "Повязка - стильный и практичный аксессуар, который станет вашим верным союзником в создании ярких образов. С ее помощью так легко подчеркнуть свою индивидуальность! Особое внимание наша компания уделяется деталям - декор создаётся вручную с минимальным использованием клея, что продлевает срок носки изделия.",
        price: 1000,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471823",
        img: "bra.webp",
        name: "Бюстгальтер",
        category: categories.underwear,
        brand: brands.americanVintage,
        sizes: [sizesCloth.l, sizesCloth.xl, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Бюстгальтер, который подчеркнет соблазнительные изгибы и развеет миф о неудобном женском белье. Каждая деталь лифа продумана до мелочей.",
        price: 2000,
        discount: 0,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471824",
        img: "set1.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики.",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471826",
        img: "set2.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики. Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471827",
        img: "blouse.webp",
        name: "Блузка",
        category: categories.clothes,
        sizes: [sizesCloth.s, sizesCloth.m, sizesCloth.l],
        brand: brands.americanVintage,
        bookmark: false,
        shortDescription: "Classic Shirt",
        longDescription: "Стильная женская шелковая блузка с V-образным вырезом. Легко сочетается с другими вещами: с брюками, джинсами и юбками. ",
        price: 2500,
        discount: 60,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471828",
        img: "shirt.webp",
        name: "Рубашка",
        category: categories.clothes,
        sizes: [sizesCloth.s, sizesCloth.m, sizesCloth.l, sizesCloth.xl, sizesCloth.xxl],
        brand: brands.deha,
        bookmark: false,
        shortDescription: "Classic Shirt",
        longDescription: "Дышащая ткань батист приятна к телу, легко разглаживается, прочная. Прямой крой не сковывает движения, в ней будет комфортно в течение всего дня. ",
        price: 2500,
        discount: 0,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471829",
        img: "trouses.webp",
        name: "Брюки",
        category: categories.clothes,
        sizes: [sizesCloth.l, sizesCloth.xl, sizesCloth.xxl],
        brand: brands.georgeGinaLucy,
        bookmark: false,
        shortDescription: "Classic Trousers",
        longDescription: "Джоггеры женские с высокой талией  - это теплые спортивные штаны прямого свободного кроя. Имеют внутренние карманы, пояс и нижнюю часть штанин на резинке. ",
        price: 2500,
        discount: 0,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471830",
        img: "sandal.webp",
        name: "Сандали",
        category: categories.shoose,
        sizes: [sizesShoes[36], sizesShoes[37], sizesShoes[38]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Shoose",
        longDescription: "Босоножки из натуральной кожи черного цвета, люксовой линейки бренда. Верх модели выполнен из кожаных, тонких ремешков украшенных камнем.",
        price: 5500,
        discount: 80,
        shoes: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471831",
        img: "sandal2.webp",
        name: "Босоножки",
        category: categories.shoose,
        sizes: [sizesShoes[38], sizesShoes[39], sizesShoes[40], sizesShoes[41], sizesShoes[42]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Shoose",
        longDescription: "Шлепанцы бренда BIRKENSTOCK выполнены из искусственной кожи. Женские пантолеты практически не ощущаются на ноге, поэтому комфорт на весь день вам обеспечен.",
        price: 5500,
        discount: 50,
        shoes: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471832",
        img: "sneakers.webp",
        name: "Кроссовки",
        category: categories.shoose,
        sizes: [sizesShoes[38], sizesShoes[39], sizesShoes[40], sizesShoes[41], sizesShoes[42]],
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Кроссовки Respect",
        longDescription: "Универсальным решением для повседневных образов являются  кроссовки Respect. При изготовлении используется качественный материал, который комфортно ощущается на ноге.",
        price: 3500,
        discount: 0,
        shoes: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471833",
        img: "bag.webp",
        name: "Сумка",
        category: categories.bags,
        brand: brands.birkenstock,
        bookmark: false,
        shortDescription: "Classic Bag",
        longDescription: "Миниатюрная каркасная женская сумка в форме трапеции может использоваться как с повседневным образами, так и для вечерних мероприятий. В производстве сумки была использована натуральная кожа - практичный и прочный материал, сохраняющий свои свойства независимо от погоды и частоты использования.",
        price: 4500,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471834",
        img: "acsess.webp",
        name: "Украшение на голову",
        category: categories.acsessories,
        brand: brands.deha,
        bookmark: false,
        shortDescription: "Head acsessories",
        longDescription: "Декоративная веточка на голову украсит нежный образ невесты или другой нарядный вариант для девушки, женщины, девочки. Нарядное украшение в волосы выполнено из жемчужных бусин – имитация натурального жемчуга, кристаллов, страз и бисера. Заколка – крокодильчик отлично подходит для фиксации прически.",
        price: 3000,
        discount: 90
    },
    {
        _id: "67rdca3eeb7f6fgeed471835",
        img: "band.webp",
        name: "Повязка на голову",
        category: categories.acsessories,
        brand: brands.americanVintage,
        bookmark: false,
        shortDescription: "Head acsessories",
        longDescription: "Повязка - стильный и практичный аксессуар, который станет вашим верным союзником в создании ярких образов. С ее помощью так легко подчеркнуть свою индивидуальность! Особое внимание наша компания уделяется деталям - декор создаётся вручную с минимальным использованием клея, что продлевает срок носки изделия.",
        price: 1000,
        discount: 0
    },
    {
        _id: "67rdca3eeb7f6fgeed471836",
        img: "bra.webp",
        name: "Бюстгальтер",
        category: categories.underwear,
        brand: brands.americanVintage,
        sizes: [sizesCloth.l, sizesCloth.xl, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Бюстгальтер, который подчеркнет соблазнительные изгибы и развеет миф о неудобном женском белье. Каждая деталь лифа продумана до мелочей.",
        price: 2000,
        discount: 0,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471837",
        img: "set1.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики.",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471838",
        img: "set2.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики. Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471839",
        img: "set1.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики.",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471840",
        img: "set2.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики. Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471841",
        img: "set1.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики.",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471842",
        img: "set2.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики. Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471843",
        img: "set1.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики.",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471844",
        img: "set2.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики. Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471845",
        img: "set1.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики.",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471846",
        img: "set2.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики. Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471847",
        img: "set1.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики.",
        price: 1600,
        discount: 10,
        cloth: true
    },
    {
        _id: "67rdca3eeb7f6fgeed471848",
        img: "set2.webp",
        name: "Комплект нижнего белья",
        category: categories.underwear,
        brand: brands.deha,
        sizes: [sizesCloth.xs, sizesCloth.s, sizesCloth.xxl],
        bookmark: false,
        shortDescription: "Classic underwear",
        longDescription: "Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики. Нижнее белье в женском элегантном исполнении. В набор входит кружевной топ и эластичные трусики",
        price: 1600,
        discount: 10,
        cloth: true
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
