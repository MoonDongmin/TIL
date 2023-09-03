import {Cat, CatType} from "./cats.model";
import {Request, Response} from "express";

// READ - 고양이 전체 데이터 조회 -> GET
export const readAllCat = (req: Request, res: Response) => {
    try {
        const cats = Cat;
        //throw new Error('db connect error');
        res.status(200).send({
            success: true,
            data: {
                cats
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};

// READ - 특정 고양이 데이터 조회 -> GET
export const readCat = (req: Request, res: Response) => {
    try {
        const params = req.params;
        console.log(params);
        const cat = Cat.find((cat) => {
            return cat.id === params.id;
        })
        res.status(200).send({
            success: true,
            data: {
                cat
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};

// CREATE 새로운 고양이 추가 API -> POST
export const createCat = (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log(data);
        Cat.push(data); // create가 됨
        res.status(200).send({
            success: true,
            data: {data},
        });
    } catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};

// UPDATE 고양이 업데이트 -> PUT(전체 업데이트)
export const updateCat = (req: Request, res: Response) => {
    try {
        const params = req.params; // DB안의 데이터
        const body = req.body; // 바뀐 데이터
        let result;
        Cat.forEach((cat) => {
            if (cat.id == params.id) {
                cat = body;
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: {cat: result},
        });
    } catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};

// UPDATE 고양이 부분 업데이트 -> PATCH
export const updatePartialCat = (req: Request, res: Response) => {
    try {
        const params = req.params; // DB안의 데이터
        const body = req.body; // 바뀐 데이터
        let result;
        Cat.forEach((cat) => {
            if (cat.id == params.id) {
                cat = {...cat, ...body};
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: {cat: result},
        });
    } catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};

// DELETE 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
    try {
        const params = req.params; // DB안의 데이터
        const newCat = Cat.filter((cat) => cat.id !== params.id);
        res.status(200).send({
            success: true,
            data: {newCat},
        });
    } catch (error) {
        res.status(400).send({
            success: false,
        });
    }
};