'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useGetProfileQuery } from '@/lib/APIs/common-api';
import { getImageLink } from '@/lib/helper';
import { dismissNotice } from '@/lib/redux/slice/noticeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { BaggageClaim, ChevronDown, LogOut, User, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import CommLogo from '../ui/CommLogo';
import { useSelector } from 'react-redux';
import { selectTotalFilledForms } from '@/lib/redux/slice/bookFormSlice';
import { Badge } from '../ui/badge';
import { BsCartDash } from 'react-icons/bs';
interface IProps {
  siteLogo: any;
  siteName: string | undefined;
  notice: string | undefined;
}

export default function HeaderClient({ siteLogo, siteName, notice }: IProps) {
  const total = useSelector(selectTotalFilledForms);
  const session = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserMenuServices, setIsUserMenuServices] = useState(false);
  const pathname = usePathname();

  const { data } = useGetProfileQuery({}, { skip: session.status !== 'authenticated' });

  const dispatch = useAppDispatch();
  const dismissed = useAppSelector((state) => state.notice.dismissed);

  const userProfile = data?.data;
  const user = session?.data?.user;
  const isHomePage = pathname === '/';

  const { setTheme, theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomePage]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about-us', label: 'About us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact-us', label: 'Contact us' },
  ];

  return (
    <>
      <header
        className={cn(
          'w-full z-50 backdrop-blur-md',
          isHomePage
            ? isScrolled
              ? 'fixed top-0 bg-white/90 shadow-lg border-b border-gray-200/20'
              : 'fixed top-0 bg-white/5 text-white'
            : 'relative bg-white shadow-sm border-b border-gray-200 ',
        )}
      >
        {!dismissed && notice && (
          <div className='py-1 bg-red-500 text-center text-white font-medium text-sm flex items-center justify-center gap-2'>
            <span>Welcome to Sohi </span>
            <button
              onClick={() => dispatch(dismissNotice())}
              className='ml-2 text-white hover:text-gray-300 transition-colors cursor-pointer'
            >
              <X className='w-4 h-4' />
            </button>
          </div>
        )}
        <div className='container mx-auto px-4 lg:px-6'>
          <div className='flex items-center justify-between h-18 lg:h-20'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center gap-3 group transition-transform duration-300 hover:scale-105'
            >
              <div className={cn('relative p-1 rounded-md transition-all duration-300')}>
                <CommLogo />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-1'>
              {navLinks?.map(({ href, label }) =>
                href === '/services' ? (
                  // ✅ Services Popover instead of Link
                  <>
                    <Popover
                      key={href}
                      open={isUserMenuServices}
                      onOpenChange={setIsUserMenuServices}
                    >
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            'relative px-4 cursor-pointer py-2 rounded-lg font-medium transition-all duration-300 group flex items-center space-x-2',
                            pathname === href
                              ? 'text-primary'
                              : isHomePage && !isScrolled
                                ? 'text-white hover:text-gray-300'
                                : 'hover:text-gray-400',
                          )}
                        >
                          {label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-300',
                              isUserMenuOpen ? 'rotate-180' : '',
                              isHomePage && !isScrolled ? 'text-white' : 'text-gray-500',
                            )}
                          />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent
                        className='w-56 p-0 shadow-2xl border-0 bg-white/90 backdrop-blur-xl'
                        align='start'
                        sideOffset={8}
                      >
                        <div className='flex flex-col'>
                          <Link
                            href='/services/meet-and-greet'
                            className='px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700'
                          >
                            Meet & Assist
                          </Link>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </>
                ) : (
                  // ✅ Normal nav link
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group',
                      pathname === href
                        ? 'text-primary'
                        : isHomePage && !isScrolled
                          ? 'text-white hover:text-gray-300'
                          : 'hover:text-gray-400',
                    )}
                  >
                    {label}
                    {pathname === href && (
                      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-primary rounded-full' />
                    )}
                  </Link>
                ),
              )}

              {/* Cart Link */}
              <Link
                href='/cart'
                className='hover:text-secondary hover:underline transition relative'
              >
                <Badge className='cursor-pointer bg-red-500 absolute right-[-10px] top-[-15px]'>
                  {total || 0}
                </Badge>
                <BsCartDash
                  width={30}
                  fontSize={26}
                  className='hover:text-secondary hover:underline transition'
                />
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className='flex items-center space-x-3'>
              <Link
                href={'/cart'} //this cart is shown for under lg device device---------------
                className='hover:text-secondary block  lg:hidden hover:underline transition relative'
              >
                <Badge className='cursor-pointer bg-red-500 absolute right-[-10px] top-[-15px]'>
                  {total || 0}
                </Badge>
                <BsCartDash
                  width={30}
                  fontSize={26}
                  className='hover:text-secondary hover:underline transition'
                />
              </Link>

              {/* User Menu */}
              <Popover open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={user ? 'outline' : 'default'}
                    className={cn(
                      'flex items-center space-x-2 rounded-full',
                      user && 'border-none',
                      isHomePage && !isScrolled && 'bg-transparent ',
                      !user && 'bg-primary',
                    )}
                  >
                    {user ? (
                      <>
                        <Avatar className='h-8 w-8 transition-all duration-300'>
                          <AvatarImage src={getImageLink(userProfile?.photo)} />
                          <AvatarFallback className='bg-destructive font-semibold'>
                            {user.name?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-300',
                            isUserMenuOpen ? 'rotate-180' : '',
                            isHomePage && !isScrolled ? 'text-white' : 'text-gray-500',
                          )}
                        />
                      </>
                    ) : (
                      <>
                        <Link href={'/sign-in'}>Sign In</Link>
                      </>
                    )}
                  </Button>
                </PopoverTrigger>

                {user && (
                  <PopoverContent
                    className='w-72 p-0 shadow-2xl border-0 bg-white/80 backdrop-blur-xl'
                    align='end'
                    sideOffset={10}
                  >
                    <div className='w-72 bg-white rounded-xl shadow-xl border border-gray-200  overflow-hidden'>
                      <div className='p-4 bg-gray-50 border-b border-gray-100'>
                        <div className='flex items-center space-x-3'>
                          <Avatar className='h-10 w-10 ring-2 ring-gray-200'>
                            <AvatarImage src={getImageLink(user?.photo)} alt={user.name} />
                            <AvatarFallback className='bg-gradient-to-br from-gray-600 to-gray-700 text-white text-sm font-semibold'>
                              {user?.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-semibold text-gray-900 truncate'>
                              {user?.name}
                            </p>
                            <p className='text-xs text-gray-600 truncate'>{user.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className='py-1'>
                        <Link href='/my-account'>
                          <button className='flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer'>
                            <User className='w-4 h-4 mr-3 text-gray-500' />
                            My Profile
                          </button>
                        </Link>
                        <Link href='/my-account/order-list'>
                          <button className='flex w-full items-center px-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer'>
                            <BaggageClaim className='w-4 h-4 mr-3 text-gray-500' />
                            Order List
                          </button>
                        </Link>

                        <hr className='my-1 border-gray-100' />
                        <button
                          onClick={() => signOut({ redirectTo: '/', redirect: true })}
                          className='flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer'
                        >
                          <LogOut className='w-4 h-4 mr-3' />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                )}
              </Popover>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'lg:hidden p-1.5 rounded-md transition-all duration-300 cursor-pointer',
                  'hover:bg-gray-100/80',
                  'focus:outline-none focus:ring-2 focus:ring-primary',
                  isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-700',
                )}
              >
                <div className='relative w-5 h-5'>
                  <span
                    className={cn(
                      'absolute block h-0.5 w-5 bg-current transform transition-all duration-300',
                      isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute block h-0.5 w-5 bg-current transform transition-all duration-300 top-2.5',
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
                    )}
                  />
                  <span
                    className={cn(
                      'absolute block h-0.5 w-5 bg-current transform transition-all duration-300',
                      isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-4',
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-500 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className='bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-700/20'>
            <div className='px-4 py-6 space-y-1'>
              {navLinks?.map(({ href, label }) =>
                href === '/services' ? (
                  <Popover key={href}>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          'relative px-4 cursor-pointer py-2 rounded-lg font-medium transition-all duration-300 group flex items-center space-x-2',
                          pathname === href
                            ? 'text-primary'
                            : isHomePage && !isScrolled
                              ? 'text-primary hover:text-primary'
                              : 'hover:text-primary',
                        )}
                      >
                        {label}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180',
                            isHomePage && !isScrolled ? 'text-white' : 'text-gray-500',
                          )}
                        />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      className='w-56 p-0 shadow-2xl border-0 bg-white/95 backdrop-blur-xl rounded-xl'
                      align='start'
                      sideOffset={8}
                    >
                      <div className='flex flex-col'>
                        <Link
                          href='/services/meet-and-greet'
                          className='px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700'
                        >
                          Meet & Assist
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group',
                      pathname === href
                        ? 'text-primary'
                        : isHomePage && !isScrolled
                          ? 'text-primary hover:text-primary'
                          : 'hover:text-primary',
                    )}
                  >
                    {label}
                    {pathname === href && (
                      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-primary rounded-full' />
                    )}
                  </Link>
                ),
              )}

              {user && (
                <>
                  <Link
                    href='/my-account'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-700  hover:bg-gray-100  hover:text-blue-600 transition-all duration-300'
                  >
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href='/my-account/order-list'
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='flex items-center px-4  rounded-lg text-base font-medium text-gray-700  hover:bg-gray-100  hover:text-blue-600 transition-all duration-300'
                  >
                    <span>Order List</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
