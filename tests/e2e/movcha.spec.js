import { test, expect } from '@playwright/test'

//Tietokanta pitää nollata sen jälkeen, kun nämä testit ajetaan tai testiarvoja pitää muuttaa.

test('Registration', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByText('Profile').click()

  await expect(page).toHaveURL('http://localhost:5173/Authentication/Login')

  await page.getByRole(
    'button', {
      name: /Rekisteröidy/i
    }
  ).click()

  await expect(page).toHaveURL('http://localhost:5173/Authentication/Register')

  await page.getByPlaceholder('Sähköpostiosoite').fill('playwright@test.fi')
  await page.getByPlaceholder('Käyttäjätunnus').fill('playwright')
  await page.getByPlaceholder('Salasana').fill('Test123!')
  
  await page.getByRole(
    'button', {
      name: /Rekisteröidy/i
    }
  ).click()

  //await expect(page.getByRole(successbox)).toContainText(success)

  await page.getByRole(
    'button', {
      name: /Takaisin/i
    }
  ).click()

  await expect(page).toHaveURL('http://localhost:5173/Authentication/Login')

  await page.getByRole(
    'button', {
      name: /Takaisin/i
    }
  ).click()

  await expect(page).toHaveURL('http://localhost:5173/')
})
