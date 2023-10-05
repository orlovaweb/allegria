import { useEffect, useState } from "react";
import brands from "../mockData/brands.json";
import categories from "../mockData/categories.json";
import goods from "../mockData/goods.json";
import sizesCloth from "../mockData/sizesCloth.json";
import sizesShoes from "../mockData/sizesShoes.json";
import httpService from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occurred"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaryCount = brands.length + categories.length + goods.length + sizesCloth.length + sizesShoes.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);
    async function initialize() {
        try {
            for (const brand of brands) {
                await httpService.put("brand/" + brand._id, brand);
                incrementCount();
            }
            for (const category of categories) {
                await httpService.put("category/" + category._id, category);
                incrementCount();
            }
            for (const good of goods) {
                await httpService.put("good/" + good._id, good);
                incrementCount();
            }
            for (const sizeCloth of sizesCloth) {
                await httpService.put("sizesCloth/" + sizeCloth._id, sizeCloth);
                incrementCount();
            }
            for (const sizeShoes of sizesShoes) {
                await httpService.put("sizesShoes/" + sizeShoes._id, sizeShoes);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    }

    return { error, initialize, progress, status };
};

export default useMockData;
