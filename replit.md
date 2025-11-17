# TECNIS® IOL Selection Tool - Patient Education Guide

## Overview

This is an interactive web application designed to help patients understand and select appropriate intraocular lenses (IOLs) through a comprehensive 5-question assessment tool. The application guides users through questions about their activities, glasses preferences, night driving habits, eye health history, and astigmatism to provide personalized IOL recommendations from the current TECNIS product lineup (Eyhance, PureSee, and Odyssey series). Built as a modern React application with Express.js backend, it features a responsive design optimized for accessibility and medical compliance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Custom React hooks with local state management for assessment flow
- **UI Framework**: Shadcn/UI components with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with CSS custom properties for theming support
- **Build Tool**: Vite for fast development and optimized production builds

### Component Structure
- **Layout Components**: Header, Footer, DisclaimerBanner for consistent structure
- **Assessment Components**: QuestionCard, ProgressSection, ResultsCard for interactive flow
- **UI Components**: Comprehensive Shadcn/UI component library with custom styling
- **Utility Components**: LoadingState, custom hooks for mobile detection and assessment logic

### Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Vite integration for seamless full-stack development experience
- **Build**: ESBuild for production server bundling

### Data Management
- **Database**: Configured for PostgreSQL with Drizzle ORM
- **Schema**: User management schema with UUID primary keys
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless integration

### Accessibility Features
- **ARIA Support**: Comprehensive ARIA labels, roles, and properties with live region announcements
- **Keyboard Navigation**: Full keyboard support with arrow key navigation (Left/Right arrows, P/N keys)
- **Screen Reader**: Semantic HTML structure with proper heading hierarchy and contextual navigation labels
- **Focus Management**: Custom focus ring styling and logical tab order
- **Responsive Design**: Mobile-first approach optimized for screens as small as 320px and landscape orientations
- **Progress Indicators**: Enhanced with descriptive aria-labels and live announcements for screen readers
- **Link Accessibility**: Visited link styling with visual distinction and comprehensive aria-labels
- **Global Accessibility Menu**: Settings for high contrast, larger text, reduced motion - stored in localStorage

### Medical Compliance
- **Disclaimer System**: Prominent medical disclaimer banner with regulatory compliance
- **Progressive Disclosure**: Stepped 5-question assessment flow with help text and explanations
- **Result Presentation**: Clear IOL recommendations with patient-friendly benefits and consolidated considerations
- **Print Support**: Print-optimized styling for patient records
- **Current TECNIS Products**: Eyhance (standard monofocal), Eyhance Toric, PureSee (intermediate EDOF), PureSee Toric, Odyssey (full multifocal), Odyssey Toric

### Assessment Logic
- **Question Flow**: (1) Activities → (2) Glasses preference → (3) Night driving → (4) Eye history → (5) Astigmatism
- **Decision Criteria**: 
  - Eyhance: Comfortable with glasses OR significant eye history (safest option)
  - PureSee: Wants less glasses + intermediate activities (sports, driving, night driving)
  - Odyssey: Hates glasses + near activities (reading, computer, crafts)
  - Toric variants: Automatically applied when astigmatism is present
  - Edge case handling: Unclear activity patterns default to Eyhance (safest recommendation)

### Deployment Configuration
- **Platform**: Configured for Vercel deployment with vercel.json and .vercelignore files
- **Build**: Production builds exclude development files and node_modules

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form for form management
- **TypeScript**: Full TypeScript support across client and server
- **Vite**: Modern build tool with hot module replacement and plugin ecosystem

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Shadcn/UI**: Pre-built component library with consistent styling
- **Lucide React**: Modern icon library for consistent iconography

### Database and ORM
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL database for cloud deployment
- **Connect PG Simple**: PostgreSQL session store for Express sessions

### Development Tools
- **TanStack Query**: Server state management and caching
- **Class Variance Authority**: Type-safe component variants
- **Date-fns**: Date manipulation and formatting utilities
- **Zod**: Runtime type validation with Drizzle integration

### Replit Integration
- **Cartographer Plugin**: Development environment mapping
- **Runtime Error Modal**: Enhanced error display during development
- **Dev Banner**: Development environment indicators