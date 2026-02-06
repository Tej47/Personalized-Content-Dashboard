import { test, expect } from '@playwright/test';

test.describe('ContentHub Critical Flows', () => {

    test('User Authentication and Search Flow', async ({ page }) => {
        // Login
        await page.goto('/login');
        await page.fill('input[type="email"]', 'explorer@example.com');
        await page.click('button:has-text("Sign In")');

        // Check redirection
        await expect(page).toHaveURL('/');
        await expect(page.getByText('explorer', { exact: true })).toBeVisible();

        // Search Functionality
        const searchInput = page.getByPlaceholder('Search for news, movies..');
        await searchInput.fill('OpenAI');

        // Wait for the first motion-div (card) to appear in the DOM
        const searchResult = page.getByText(/OpenAI/i).first();
        await expect(searchResult).toBeVisible({ timeout: 10000 }); // Giving it extra time for API lag

        // Verify that the results actually contain the search term
        await expect(searchResult).toContainText(/OpenAI/i);
    });

    test('Drag and Drop Reordering', async ({ page }) => {
        await page.goto('/');
        // Ensure we are logged in
        await page.fill('input[type="email"]', 'test@test.com');
        await page.click('button:has-text("Sign In")');

        const firstCard = page.locator('h3').first();
        const secondCard = page.locator('h3').nth(1);
        const firstTitle = await firstCard.innerText();

        // Perform Drag and Drop
        await firstCard.hover();
        await page.mouse.down();
        await secondCard.hover();
        await page.mouse.up();

        // Verify the order has changed
        const newFirstTitle = await page.locator('h3').first().innerText();
        expect(newFirstTitle).not.toBe(firstTitle);
    });

    test('Theme Toggle persistence', async ({ page }) => {
        await page.goto('/');
        await page.fill('input[type="email"]', 'test@test.com');
        await page.click('button:has-text("Sign In")');

        const html = page.locator('html');
        const themeBtn = page.locator('header button');

        // Toggle to Dark
        await themeBtn.click();
        await expect(html).toHaveClass(/dark/);

        // Reload to test Redux Persist
        await page.reload();
        await expect(html).toHaveClass(/dark/);
    });
});