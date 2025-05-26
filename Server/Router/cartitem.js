const CartItem = require('./models/CartItem');
const WishlistItem = require('./models/WishlistItem');

// Add to Cart API
app.post('/cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const cartItem = await CartItem.create({
            userId,
            productId,
            quantity,
        });
        res.status(201).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
});

// Add to Wishlist API
app.post('/wishlist', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const wishlistItem = await WishlistItem.create({
            userId,
            productId,
        });
        res.status(201).json({ message: 'Item added to wishlist', wishlistItem });
    } catch (error) {
        console.error('Error adding item to wishlist:', error);
        res.status(500).json({ message: 'Error adding item to wishlist', error });
    }
});
