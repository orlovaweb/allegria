import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBrands } from "../../../store/brands";
import { getGoods } from "../../../store/goods";
import {
  addToCart,
  addUnauthorizedToCart,
  getIsLoggedIn
} from "../../../store/users";
import Bookmark from "../../common/bookmark/bookmark";
import Breadcrumbs from "../../common/breadcrumbs";
import Counter from "../../common/counter";
import Discount from "../../common/discount";
import Modal from "../../common/modal";
import Price from "../../common/price";
import SizesList from "../../ui/sizesList";
import "./productCard.css";
// import { getProductByArtSize } from "../../../store/goods";

const ProductCard = ({ goods }) => {
  const { productArt } = useParams();
  const product = goods.find((p) => {
    return p.art === productArt;
  });
  const artGoods = useSelector(getGoods());
  const brands = useSelector(getBrands());
  const [modalPayActive, setModalPayActive] = useState(false);
  const [modalRefundActive, setModalRefundActive] = useState(false);
  const [modalImgPreview, setModalImgPreview] = useState(false);
  const [isExpandedLongDescription, setIsExpandedLongDescription] =
    useState(false);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onDecrement = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1);
    }
  };
  const onIncrement = () => {
    setCount((prevState) => prevState + 1);
  };

  const submitAction = (data) => {
    if (artGoods) {
      const choiceProduct = artGoods.find((p) => {
        return p.art === productArt && p.size === data.size;
      });

      const choiсeObj = { productId: choiceProduct._id, count };
      if (isLoggedIn) {
        dispatch(addToCart(choiсeObj));
      } else {
        dispatch(addUnauthorizedToCart(choiсeObj));
      }
    }
  };

  const toggleExpansionLongDescription = () => {
    setIsExpandedLongDescription(!isExpandedLongDescription);
  };
  const getBrandName = (id) => {
    const brandIndex = brands.findIndex((el) => {
      return el._id === id;
    });

    return brands[brandIndex].name;
  };

  if (product) {
    return (
      <section className="card">
        <div className="container">
          <Breadcrumbs selectedPage={product.name} />
          <div className="card-wrapper">
            <div className="card__img-wrapper">
              <img
                className="card__img"
                src={process.env.PUBLIC_URL + "/img/" + product.img}
                alt="clothes"
                onClick={() => setModalImgPreview(true)}
              />
              <div className="card-bookMark">
                <Bookmark productArt={product.art} />
              </div>
              <Discount discount={product.discount} />
            </div>
            <div className="card__content">
              <h1 className="card__content-brand">
                {getBrandName(product.brand)}
              </h1>
              <h2 className="card__content-shortDescription">
                {product.shortDescription}
              </h2>
              <div className="card__content-price">
                <Price price={product.price} discount={product.discount} />
              </div>
              <form onSubmit={handleSubmit(submitAction)}>
                {product.size && (
                  <div className="card__content-sizes">
                    <p>Размеры</p>
                    <div className="card__content-sizes-box">
                      <SizesList register={register} sizes={product.size} />
                    </div>
                  </div>
                )}
                <div className="card__content-counter">
                  <Counter
                    onDecrement={onDecrement}
                    onIncrement={onIncrement}
                    count={count}
                  />
                </div>
                {errors.size && (
                  <p className="invalid-feedback">Выберите размер</p>
                )}
                <button className="btn card__content-btn">
                  Добавить в корзину
                </button>
              </form>
              <div className="card__content-popup-box">
                <button onClick={() => setModalPayActive(true)}>
                  Оплата и доставка
                </button>
                <button onClick={() => setModalRefundActive(true)}>
                  Возврат и обмен
                </button>
              </div>

              <div className="card__content-description">
                <h3>Информация о товаре</h3>
                <div
                  className={`card__content-long-description ${
                    isExpandedLongDescription ? "expanded" : ""
                  }`}
                >
                  <p>{product.longDescription}</p>
                  {product.longDescription.length > 104 && (
                    <div className="bottom"></div>
                  )}
                </div>
                {product.longDescription.length > 104 && (
                  <>
                    <button
                      className="show-more"
                      onClick={toggleExpansionLongDescription}
                    >
                      {isExpandedLongDescription
                        ? "Свернуть"
                        : "Показать больше"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal active={modalPayActive} setActive={setModalPayActive}>
          <div className="card-modal">
            <h3>Оплата</h3>
            <h4>Наличными при получении</h4>
            <p>
              Оплата осуществляется наличными денежными средствами курьеру
              непосредственно при доставке заказа на адрес получателя. Выбрав
              данный способ оплаты, Вы получаете возможность рассмотреть и
              примерить заказанный товар.
            </p>
            <p>
              Если какая-то позиция Вам не подошла, Вы можете просто вернуть ее
              курьеру, не оплачивая.
            </p>
            <h4>Картой на сайте (Visa, Mastercard)</h4>
            <p className="card-modal-last-p">
              На сайте нашего интернет-магазина мы принимаем оплату платежными
              картами Visa и Mastercard. Безопасность проведения платежей у нас
              гарантирована системой eCommerceConnect с использованием
              современного стандарта «3-D Secure».
            </p>
            <h3>Доставка</h3>
            <h4>На отделение &quot;Почта России&quot;</h4>
            <p>
              Доставка заказов клиентам интернет-магазина ALLEGRIA
              осуществляется по территории всей России курьерской службой
              &quot;Почта России&quot;.
            </p>
            <h3>Оплата</h3>
            <h4>Наличными при получении</h4>
            <p>
              Оплата осуществляется наличными денежными средствами курьеру
              непосредственно при доставке заказа на адрес получателя. Выбрав
              данный способ оплаты, Вы получаете возможность рассмотреть и
              примерить заказанный товар.
            </p>
            <p>
              Если какая-то позиция Вам не подошла, Вы можете просто вернуть ее
              курьеру, не оплачивая.
            </p>
            <h4>Картой на сайте (Visa, Mastercard)</h4>
            <p className="card-modal-last-p">
              На сайте нашего интернет-магазина мы принимаем оплату платежными
              картами Visa и Mastercard. Безопасность проведения платежей у нас
              гарантирована системой eCommerceConnect с использованием
              современного стандарта «3-D Secure».
            </p>
            <h3>Доставка</h3>
            <h4>На отделение &quot;Почта России&quot;</h4>
            <p>
              Доставка заказов клиентам интернет-магазина ALLEGRIA
              осуществляется по территории всей России курьерской службой
              &quot;Почта России&quot;.
            </p>
          </div>
        </Modal>
        <Modal active={modalRefundActive} setActive={setModalRefundActive}>
          <div className="card-modal">
            <h3>Возврат и обмен</h3>
            <p>
              Возврат товаров, приобретенных в интернет-магазине ALLEGRIA,
              происходит согласно Закону РФ «О защите прав потребителей».
            </p>
            <p>Вы можете вернуть товар на протяжении 14 дней со дня покупки.</p>
            <h4>Как оформить заявку на возврат?</h4>
            <p>
              Если купленная вещь Вам не понравилась или не подошла — свяжитесь
              с нашим контакт центром по телефону 000 00 000 и мы поможем
              оформить заявку на возврат.
            </p>
            <h4>Какие есть условия по возврату товара?</h4>
            <p>
              Обмен и возврат товара производится в том случае, если указанный
              товар не был в употреблении, полностью сохранен его товарный вид —
              без повреждений и следов ношения, оригинальная упаковка, а также
              бирки, пломбы, ярлыки, фирменные знаки.
            </p>
            <p>
              Не возвращаются и не подлежат обмену купальники, нижнее белье,
              чулочно-носочные изделия, предметы личной гигиены, перчатки.
            </p>
            <p>
              Вы можете осуществить возврат товар непосредственно в наших
              розничных магазинах, расположенных в Москве, Санкт-Петербурге,
              Калуге, Казани. Для жителей других городов России пересылка товара
              перевозчиком Почты России или любым другим, на склад интернет
              магазина ALLEGRIA, расположенного в городе Москва, осуществляется
              за счет компании.
            </p>
          </div>
        </Modal>
        <Modal
          active={modalImgPreview}
          setActive={setModalImgPreview}
          isImg={true}
        >
          <img
            className="card__modal-img"
            src={process.env.PUBLIC_URL + "/img/" + product.img}
            alt="clothes"
          />
        </Modal>
      </section>
    );
  }
  return <h2>Loading...</h2>;
};
ProductCard.propTypes = {
  goods: PropTypes.array
};
export default ProductCard;
