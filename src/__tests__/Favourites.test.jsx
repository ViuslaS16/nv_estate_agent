import { render, screen, fireEvent, act } from '@testing-library/react';
import { FavouritesProvider, useFavourites } from '../context/FavouritesContext';

function TestComponent() {
    const {
        favourites,
        addToFavourites,
        removeFromFavourites,
        clearAllFavourites,
        isFavourite,
        favouriteCount,
        notification
    } = useFavourites();

    const testProperty = {
        id: 'test-001',
        type: 'house',
        price: 500000,
        description: 'Test Property'
    };

    const testProperty2 = {
        id: 'test-002',
        type: 'flat',
        price: 300000,
        description: 'Second Test Property'
    };

    return (
        <div>
            <p data-testid="count">Count: {favouriteCount}</p>
            <p data-testid="is-favourite">{isFavourite('test-001') ? 'Yes' : 'No'}</p>
            {notification && <p data-testid="notification">{notification.message}</p>}

            <button onClick={() => addToFavourites(testProperty)}>Add Property 1</button>
            <button onClick={() => addToFavourites(testProperty2)}>Add Property 2</button>
            <button onClick={() => removeFromFavourites('test-001')}>Remove Property 1</button>
            <button onClick={() => clearAllFavourites(true)}>Clear All</button>

            <ul>
                {favourites.map(fav => (
                    <li key={fav.id} data-testid={`fav-${fav.id}`}>{fav.description}</li>
                ))}
            </ul>
        </div>
    );
}

const renderWithProvider = () => {
    return render(
        <FavouritesProvider>
            <TestComponent />
        </FavouritesProvider>
    );
};

describe('FavouritesContext', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('starts with empty favourites', () => {
        renderWithProvider();
        expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
    });

    test('adds property to favourites', () => {
        renderWithProvider();

        fireEvent.click(screen.getByText('Add Property 1'));

        expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');
        expect(screen.getByTestId('fav-test-001')).toHaveTextContent('Test Property');
    });

    test('prevents adding duplicate property', () => {
        renderWithProvider();

        fireEvent.click(screen.getByText('Add Property 1'));
        fireEvent.click(screen.getByText('Add Property 1'));

        expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');
    });

    test('shows warning notification on duplicate attempt', () => {
        renderWithProvider();

        fireEvent.click(screen.getByText('Add Property 1'));
        fireEvent.click(screen.getByText('Add Property 1'));

        expect(screen.getByTestId('notification')).toHaveTextContent('This property is already in your favourites');
    });

    test('allows adding multiple different properties', () => {
        renderWithProvider();

        fireEvent.click(screen.getByText('Add Property 1'));
        fireEvent.click(screen.getByText('Add Property 2'));

        expect(screen.getByTestId('count')).toHaveTextContent('Count: 2');
        expect(screen.getByTestId('fav-test-001')).toBeInTheDocument();
        expect(screen.getByTestId('fav-test-002')).toBeInTheDocument();
    });

    test('removes property from favourites', () => {
        renderWithProvider();

        fireEvent.click(screen.getByText('Add Property 1'));
        expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');

        fireEvent.click(screen.getByText('Remove Property 1'));
        expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
    });

    test('clears all favourites', () => {
        renderWithProvider();

        fireEvent.click(screen.getByText('Add Property 1'));
        fireEvent.click(screen.getByText('Add Property 2'));
        expect(screen.getByTestId('count')).toHaveTextContent('Count: 2');

        fireEvent.click(screen.getByText('Clear All'));
        expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
    });

    test('isFavourite correctly identifies favourited properties', () => {
        renderWithProvider();

        expect(screen.getByTestId('is-favourite')).toHaveTextContent('No');

        fireEvent.click(screen.getByText('Add Property 1'));
        expect(screen.getByTestId('is-favourite')).toHaveTextContent('Yes');

        fireEvent.click(screen.getByText('Remove Property 1'));
        expect(screen.getByTestId('is-favourite')).toHaveTextContent('No');
    });

    test('shows success notification when property added', () => {
        renderWithProvider();

        fireEvent.click(screen.getByText('Add Property 1'));

        expect(screen.getByTestId('notification')).toHaveTextContent('Added to favourites!');
    });

    test('notification auto-dismisses after timeout', () => {
        renderWithProvider();

        fireEvent.click(screen.getByText('Add Property 1'));
        expect(screen.getByTestId('notification')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(screen.queryByTestId('notification')).not.toBeInTheDocument();
    });
});

describe('useFavourites hook error handling', () => {
    test('throws error when used outside FavouritesProvider', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        function BadComponent() {
            useFavourites();
            return null;
        }

        expect(() => render(<BadComponent />)).toThrow(
            'useFavourites must be used within a FavouritesProvider'
        );

        consoleSpy.mockRestore();
    });
});
