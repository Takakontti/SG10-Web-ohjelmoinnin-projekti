import { test, expect } from '@playwright/test'

//Tietokanta pitää nollata sen jälkeen, kun nämä testit ajetaan tai testiarvoja pitää muuttaa.

test('Registration', async ({ page },workerInfo) => {
  await page.goto('http://localhost:5173/')

  

  await page.getByRole(
    'img', {
      name: 'Profiili'
    }
  ).click()

  await expect(page).toHaveURL('http://localhost:5173/Authentication/Login')

  await page.getByRole(
    'button', {
      name: 'Rekisteröidy'
    }
  ).click()

  await expect(page).toHaveURL('http://localhost:5173/Authentication/Register')

  await page.getByRole(
    'textbox', {
      name: 'Sähköpostiosoite:'
    }
  ).fill(`playwright.${workerInfo.project.name}@test.fi`)

  await page.getByRole(
    'textbox', {
      name: 'Käyttäjätunnus:'
    }
  ).fill(`playwright.${workerInfo.project.name}`)

  await page.getByRole(
    'textbox', {
      name: 'Salasana:'
    }
  ).fill('Test123!')
  
  await page.getByRole(
    'button', {
      name: 'Rekisteröidy'
    }
  ).click()

  await expect(page.getByText('Rekisteröinti onnistui! Sinut uudelleenohjataan 5 sekunnin päästä')).toBeVisible()
  await expect(page).toHaveURL('http://localhost:5173/Authentication/Login', {timeout: 6000})

  await page.getByRole(
    'button', {
      name: 'Takaisin'
    }
  ).click()

  await expect(page).toHaveURL('http://localhost:5173/')
})