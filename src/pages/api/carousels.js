import CarouselModel from '../../models/Carousel';
import dbConnect from '../../lib/db';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const { slides } = req.body;

        // Validate the request body
        if (!slides || !Array.isArray(slides) || slides.length < 2) {
            return res.status(400).json({
                success: false,
                error: 'At least 2 slides are required'
            });
        }

        // Validate each slide
        for (const slide of slides) {
            if (!slide.src || !slide.alt || !slide.width || !slide.height) {
                return res.status(400).json({
                    success: false,
                    error: 'Each slide must have src, alt, width, and height properties'
                });
            }
        }

        try {
            const carousel = new CarouselModel({ slides });
            await carousel.save();
            res.status(201).json(carousel);
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    else if (req.method === 'GET') {
        try {
            const carousels = await CarouselModel.find({});
            res.status(200).json(carousels);
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    else if (req.method === 'PUT') {
        const { id, slides } = req.body;

        if (!id || !slides || !Array.isArray(slides) || slides.length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Valid ID and at least 2 slides are required'
            });
        }

        try {
            const carousel = await CarouselModel.findById(id);
            if (!carousel) {
                return res.status(404).json({
                    success: false,
                    error: 'Carousel not found'
                });
            }

            carousel.slides = slides;
            await carousel.save();
            res.status(200).json(carousel);
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    else if (req.method === 'DELETE') {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'ID is required'
            });
        }

        try {
            const carousel = await CarouselModel.findById(id);
            if (!carousel) {
                return res.status(404).json({
                    success: false,
                    error: 'Carousel not found'
                });
            }

            await CarouselModel.findByIdAndDelete(id);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}