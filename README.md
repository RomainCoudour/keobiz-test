# Keobiz technical test

Pas super content de mon test alors qu'il n'y avait rien de dur.
Je me suis un peu compliqué la vie et j'ai perdu du temps : (tryout de TypeORM par exemple).

Le script se trouve `src/infrastructure/persistence/repositories/balance-sheet-repository.ts`, testé dans `tests/application/balance-sheet.service.integration.spec.ts`

### Run tests

:warning: DO NOT FORGET TO ADD A `.env` FILE BASED OF `.env.example`

```
npm run test
```

#### Axes d'amélioration

- Real DI System (comme TypeDI)
- Error handling
- Security
- Validation (API, DATA)
- Async logging and monitoring
- Tests (Factorize, optimize, coverage)
