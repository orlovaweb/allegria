import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Breadcrumbs from "../../common/breadcrumbs";
import Bookmark from "../../common/bookmark/bookmark";
import "./productCard.css";
import Discount from "../../common/discount";
import Price from "../../common/price";
import SizesList from "../../ui/sizesList";
import Counter from "../../common/counter";
import Modal from "../../common/modal";

const ProductCard = ({ id, onToggleBookMark }) => {
  const [product, setProduct] = useState();
  const [modalPayActive, setModalPayActive] = useState(false);
  const [modalRefundActive, setModalRefundActive] = useState(false);
  const [modalImgPreview, setModalImgPreview] = useState(false);
  const [isExpandedLongDescription, setIsExpandedLongDescription] =
    useState(false);
  useEffect(() => {
    api.goods.getById(id).then((data) => setProduct(data));
  }, []);

  const renderSizes = (sizes) => {
    if (sizes)
      return (
        <div className="card__content-sizes">
          <p>Размеры</p>
          <div className="card__content-sizes-box">
            <SizesList
              sizes={product.sizes}
              flagCloth={Boolean(product.cloth)}
            />
          </div>
        </div>
      );
    return null;
  };
  const toggleExpansionLongDescription = () => {
    setIsExpandedLongDescription(!isExpandedLongDescription);
  };

  if (product) {
    console.log(
      "product.longDescription.length",
      product.longDescription.length
    );
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
              <Bookmark
                className="card-bookMark"
                status={product.bookmark}
                onClick={() => onToggleBookMark(product._id)}
              />
              <Discount discount={product.discount} />
            </div>
            <div className="card__content">
              <h1 className="card__content-brand">{product.brand.name}</h1>
              <h2 className="card__content-shortDescription">
                {product.shortDescription}
              </h2>
              <div className="card__content-price">
                <Price price={product.price} discount={product.discount} />
              </div>
              {renderSizes(product.sizes)}
              <div className="card__content-counter">
                <Counter />
              </div>
              <button className="btn card__content-btn">
                Добавить в корзину
              </button>
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
  id: PropTypes.string.isRequired,
  onToggleBookMark: PropTypes.func
};
export default ProductCard;
