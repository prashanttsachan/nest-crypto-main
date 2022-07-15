import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ENVIRONMENT } from './shared/enum';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyHelmet from '@fastify/helmet';

async function bootstrap() {
	process.env.NODE_ENV = process.env.NODE_ENV || ENVIRONMENT.development;
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	// await app.register(fastifyHelmet, {
	// 	contentSecurityPolicy: {
	// 		directives: {
	// 			defaultSrc: [`'self'`],
	// 			styleSrc: [
	// 				`'self'`,
	// 				`'unsafe-inline'`,
	// 				'cdn.jsdelivr.net',
	// 				'fonts.googleapis.com',
	// 			],
	// 			fontSrc: [`'self'`, 'fonts.gstatic.com'],
	// 			imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
	// 			scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
	// 		},
	// 	},
	// });
	  
	  // If you are not going to use CSP at all, you can use this:
	await app.register(fastifyHelmet, {
		contentSecurityPolicy: false,
	});

	const config = new DocumentBuilder()
		.setTitle('Crypto Exchange')
		.setDescription('The crypto exchange description')
		.setVersion('1.0')
		.addTag('exchange')
		.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('swagger', app, document);

	await app.listen(process.env.PORT || 4945, () => {
		console.log(`App is listening on port: ${process.env.PORT}`)
	});

		// "plugins": [{
		// 	"name": "@nestjs/swagger"
		// }]
}
bootstrap();
