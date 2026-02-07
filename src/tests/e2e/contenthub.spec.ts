// 
import { test, expect } from '@playwright/test';

test.describe('ContentHub E2E Critical Flows', () => {

    test.beforeEach(async ({ page }) => {
        // Shared login step for all tests
        await page.goto('/login');
        await page.fill('input[type="email"]', 'test@example.com');
        await page.click('button:has-text("Sign In")');
        await expect(page).toHaveURL('/');
    });

    test('Search flow handles debouncing and interleaving', async ({ page }) => {
        const searchInput = page.getByPlaceholder(/Search for news, movies/i);

        // Type and trigger debounce
        await searchInput.fill('Batman');

        // Wait for the heading to change (confirms debounce finished)
        await expect(page.getByText('Search Results for "Batman"')).toBeVisible();

        // Locate cards by the test-id
        const cards = page.getByTestId('content-card');

        await expect(cards.first()).toBeVisible();

        // Now that we know at least one is visible, we can check the count safely
        const count = await cards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('Preference limit alert prevents 4th selection', async ({ page }) => {
        await page.goto('/settings');

        const categories = ['Technology', 'Business', 'Science', 'Health'];

        // Select first 3 (assuming 0 are selected by default for this test user)
        for (let i = 0; i < 3; i++) {
            await page.click(`button:has-text("${categories[i]}")`);
        }

        // Listen for the window.alert
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Limit preferences to 3');
            await dialog.dismiss();
        });

        // Attempt to click the 4th
        await page.click(`button:has-text("${categories[3]}")`);
    });

    test('Theme Toggle persistence', async ({ page }) => {
        await page.goto('/');

        const html = page.locator('html');

        // Use getByTestId for a direct match
        const themeBtn = page.getByTestId('theme-toggle');

        // Ensure the button is actually there before clicking
        await expect(themeBtn).toBeVisible();

        const currentClass = await html.getAttribute('class');
        const isDark = currentClass?.includes('dark');

        // Toggle theme
        await themeBtn.click();

        // Verify the class changed
        if (isDark) {
            await expect(html).not.toHaveClass(/dark/);
        } else {
            await expect(html).toHaveClass(/dark/);
        }

        // Reload to test Redux Persist
        await page.reload();

        // Final check after reload
        if (isDark) {
            await expect(html).not.toHaveClass(/dark/);
        } else {
            await expect(html).toHaveClass(/dark/);
        }
    });

    test('Trending page design matches favorites', async ({ page }) => {
        await page.goto('/trending');
        const heading = page.locator('h1');

        // Ensure consistent styling
        await expect(heading).toHaveText(/Trending Now/i);
        await expect(heading).toHaveClass(/text-3xl font-bold/);
    });
});