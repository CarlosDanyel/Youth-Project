import { formatTailwindHTML } from '@/lib/utils';
import puppeteer from 'puppeteer';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { html, structure } = body;

    if (!html || !structure)
      return Response.json(
        { message: 'Parâmetros invalidos' },
        { status: 400 }
      );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(formatTailwindHTML(html, structure));

    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight + 20;
    });

    const pdf = await page.pdf({
      width: '210mm',
      height: `${bodyHeight}`,
      printBackground: true,
    });

    await browser.close();

    return new Response(pdf, {
      headers: {
        'Content-type': 'aplication/pdf',
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: 'Ocorreu um erro inesperado', error },
      { status: 500 }
    );
  }
};
