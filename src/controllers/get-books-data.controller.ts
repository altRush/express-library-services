import axios from 'axios';
import { Request, Response } from 'express';

export const getAllBooksController = async (_req: Request, res: Response) => {
	try {
		const { data } = await axios('https://freetestapi.com/api/v1/books');

		res.status(200).json(data);
	} catch (e) {
		if (e instanceof Error) {
			res.status(500).json({
				errorMessage: e.message
			});
		}
	}
};

export const getSingleBookController = async (req: Request, res: Response) => {
	try {
		const bookId = req.params.bookId;

		const { data } = await axios(
			`https://freetestapi.com/api/v1/books/${bookId}`
		);

		res.status(200).json(data);
	} catch (e) {
		if (e instanceof Error) {
			res.status(500).json({
				errorMessage: e.message
			});
		}
	}
};
