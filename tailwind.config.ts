import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Game-specific colors
				fire: 'hsl(var(--fire))',
				ice: 'hsl(var(--ice))',
				earth: 'hsl(var(--earth))',
				lightning: 'hsl(var(--lightning))',
				holy: 'hsl(var(--holy))',
				shadow: 'hsl(var(--shadow))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary-glow) / 0.5)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary-glow) / 0.8)' 
					}
				},
				'magical-float': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotate(0deg)',
						filter: 'brightness(1)'
					},
					'33%': { 
						transform: 'translateY(-5px) rotate(1deg)',
						filter: 'brightness(1.1)'
					},
					'66%': { 
						transform: 'translateY(-3px) rotate(-1deg)',
						filter: 'brightness(1.05)'
					}
				},
				'card-flip': {
					'0%': { transform: 'rotateY(0deg)' },
					'50%': { transform: 'rotateY(90deg)' },
					'100%': { transform: 'rotateY(0deg)' }
				},
				'energy-pulse': {
					'0%, 100%': { 
						opacity: '0.7',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.05)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'magical-float': 'magical-float 4s ease-in-out infinite',
				'card-flip': 'card-flip 0.6s ease-in-out',
				'energy-pulse': 'energy-pulse 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-fire': 'var(--gradient-fire)',
				'gradient-ice': 'var(--gradient-ice)',
				'gradient-holy': 'var(--gradient-holy)',
				'gradient-shadow': 'var(--gradient-shadow)'
			},
			boxShadow: {
				'mystical': 'var(--shadow-mystical)',
				'fire': 'var(--shadow-fire)',
				'glow': 'var(--shadow-glow)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
