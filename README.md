# SUWO

The University of Sydney Wind Orchestra's Website - A modern web application for
managing orchestra members, attendance, and public information.

```
      __________  ____  ____  ___  __  ___  __________
     /         / /    /    / /   /   /   / /         /
    /    _____/ /    /    / /   /   /   / /         /
   /         / /    /    / /           / /    /    /
  /_____    / /    /    / /           / /    /    /
 /         / /         / /     /     / /         /
/_________/ /_________/ /_____/_____/ /_________/
```

## 🎼 About SUWO

SUWO (Sydney University Wind Orchestra) is a multi-award-winning concert band
based at the University of Sydney. Founded in 2003, SUWO brings together
students and alumni to perform a diverse repertoire of wind band music, ranging
from classical works to contemporary pieces. The orchestra is known for its
vibrant community, occasional performances throughout the year, and a welcoming
atmosphere for new members—no auditions required. SUWO has received numerous
accolades, including "BEST SMALL CLUB" at Sydney University (2006–2010) and
"Champion Open B Grade Concert Band" in NSW (2011). Members enjoy opportunities
for musical growth, social events, and contributing to the university's cultural
life.

## 🚀 Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design
  system
- **UI Components**: Custom design system built on
  [Radix UI](https://www.radix-ui.com/) and [Heroicons](https://heroicons.com/)
- **State Management**:
  [TanStack Query (React Query)](https://tanstack.com/query)
- **Forms**: [TanStack Form](https://tanstack.com/form) with
  [Zod](https://zod.dev/) validation

### Backend

- **Database**: [Neon](https://neon.tech/) PostgreSQL with
  [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [`jose`](https://github.com/panva/jose) for JWT session
  management with [Argon2](https://github.com/ranisalt/node-argon2) password
  hashing
- **Email**: [Resend](https://resend.com/) for transactional emails
- **CMS**: [Notion](https://www.notion.so/) for content management

### Development & Deployment

- **Package Manager**: [pnpm](https://pnpm.io/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) with strict
  configuration
- **Code Quality**: [ESLint](https://eslint.org/),
  [Prettier](https://prettier.io/)
- **Documentation**: [Storybook](https://storybook.js.org/) for component
  documentation ([view our Storybook](https://design.suwo.org.au))
- **Deployment**: [Vercel](https://vercel.com/)
- **Monitoring**: [Vercel Analytics](https://vercel.com/analytics)

## ✨ Features

- 🏠 **Marketing Pages**: Orchestra information, calendar, history, and joining
  details
- 📚 **Dynamic History**: Content managed through Notion CMS
- 🔐 **Authentication**: Secure login/logout with session management
- 👤 **Profile Management**: Update personal information and instrument
- 📧 **Mailing List**: Opt-in/out of weekly communications
- 🔒 **Password Management**: Secure password updates
- 📋 **Roll Call**: Digital attendance tracking with QR codes
- 📊 **Attendance Management**: View and manage weekly attendance
- 👥 **Member Directory**: Access to all orchestra member profiles
- 🎺 **Equipment Inventory**: Track and view available equipment

## 📁 Project Structure

```
suwo/
├── prisma/
│   ├── migrations/               # Database migration files
│   ├── models/                   # Prisma schema files
│   └── schema.prisma             # Prisma config schema
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (app)/                # Authenticated app pages
│   │   │   ├── calendar/         # Rehearsal calendar
│   │   │   ├── events/           # Event management
│   │   │   ├── mailing-list/     # Mailing list admin
│   │   │   ├── members/          # Member directory
│   │   │   └── settings/         # Account settings
│   │   ├── (auth)/               # Authentication (login, register, etc.)
│   │   ├── (marketing)/          # Public marketing pages
│   │   └── api/                  # API routes
│   ├── design_system/            # Reusable UI components
│   ├── features/                 # Feature-specific modules
│   │   ├── auth/
│   │   ├── event/
│   │   ├── marketing/
│   │   ├── navigation/
│   │   └── user/
│   ├── generated/                # Prisma output – ignore this
│   ├── lib/
│   │   ├── data/                 # Data fetching helpers
│   │   ├── dtos/                 # Data transfer objects & validators
│   │   ├── forms/                # TanStack Form forms
│   │   ├── mutations/            # TanStack Query mutations
│   │   ├── pages/                # Page-specific helpers
│   │   └── queries/              # TanStack Query queries
│   ├── styles/                   # Global styles and design tokens
│   ├── utils/                    # Utility functions and helpers
│   ├── config.ts                 # Application configuration
│   └── routes.ts                 # Application route definitions
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies and scripts
├── pnpm-lock.yaml                # Lockfile
├── pnpm-workspace.yaml           # Workspace configuration
├── postcss.config.mjs            # Tailwind/PostCSS configuration
├── prettier.config.mjs           # Prettier configuration
└── tsconfig.json                 # TypeScript configuration
```

### Design System Directory

Components live under `src/design_system/`. Each primitive or component has its
own folder (for example, `button`, `checkbox`, or `dialog`) that includes:

- the implementation file (`*.tsx`)
- an `index.ts` barrel for exports
- `types.ts` for shared types
- a `*.stories.tsx` file for Storybook documentation
- optional helpers in `utils/` or additional variant files

Some folders, such as `input/` or `icons/`, group related variations, while
shared layout pieces like `section.tsx` and `settings_section.tsx` live directly
in the directory root. Browse the full catalogue in our
[Storybook](https://design.suwo.org.au).

## 🛠️ Development Setup

### Prerequisites

- [Node.js 22+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository**

   ```bash
   gh repo clone nico-bachner/suwo
   cd suwo
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   vercel env pull
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

### Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `format` - Format code with Prisma and Prettier
- `sb:dev` - Start Storybook for component development
- `sb:build` - Build Storybook for production

## 🤝 Contributing

### Code Style

- Use TypeScript for all new code
- Follow the existing file naming conventions (snake_case for files, PascalCase
  for components)
- Add JSDoc comments for complex functions
- Ensure all components are properly typed
- Prefer absolute imports (`@/` prefix)

### Component Development

- Create components in the appropriate feature folder or design system
- Include Storybook stories for reusable components
- Follow the established design patterns and color system
- Ensure components are accessible and responsive

### Database Changes

1. Create Prisma migration: `pnpm prisma migrate dev --name [MIGRATION_NAME]`
   (use snake case for migration names)
2. Fix potentially broken TypeScript types

### Git Workflow

1. Create a feature branch from `main`
2. Make your changes with descriptive commit messages
3. Ensure all tests pass and code is properly formatted
4. Create a pull request with a clear description

### Adding New Features

1. **API Routes**: Add to `/src/app/api/` following the existing patterns
2. **Pages**: Use the appropriate route group (`(marketing)` for public, `(app)`
   for authenticated)
3. **Components**: Place in the relevant feature folder or design system
4. **Utilities**: Add to `/src/utils/` if framework-independent

### Testing

- Our dev database is a replica of the production database. Use that to your
  advantage to test against real data.
- Verify responsive design on multiple screen sizes
- Check accessibility with screen readers

## 📄 License

This project is private and proprietary to the University of Sydney Wind
Orchestra.
