import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/pages/productCard/productCard";
import GoodsList from "../../components/ui/goodsParts/goodsList";
import GoodsLoader from "../../components/ui/hoc/goodsLoader";
import { getGoods } from "../../store/goods";

const Goods = () => {
  const defaultPageSize = 12;
  const params = useParams();
  const { productId } = params;
  const goods = useSelector(getGoods());
  const [selectedCat, setSelectedCat] = useState();
  const [sortBy, setSortBy] = useState({ name: "lastPrice", order: "asc" });
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [showFiltration, setShowFiltration] = useState(false);

  useEffect(() => {
    setPageSize(defaultPageSize);
  }, [selectedCat, sortBy, showFiltration]);

  return (
    <>
      <GoodsLoader>
        {productId ? (
          <ProductCard />
        ) : (
          <GoodsList
            goods={goods}
            setSelectedCat={setSelectedCat}
            setSortBy={setSortBy}
            selectedCat={selectedCat}
            sortBy={sortBy}
            pageSize={pageSize}
            setPageSize={setPageSize}
            showFiltration={showFiltration}
            setShowFiltration={setShowFiltration}
          />
        )}
      </GoodsLoader>
    </>
  );
};

export default Goods;
