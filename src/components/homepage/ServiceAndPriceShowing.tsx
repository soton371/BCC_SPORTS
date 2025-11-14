const ServiceAndPriceShowing = ({
  category_name,
  discount_price,
  regular_price,
}: {
  category_name: string;
  regular_price: number;
  discount_price?: number;
}) => {
  return (
    <div className='space-y-1'>
      <div className=''>
        <label
          key={category_name}
          className='group relative flex items-center gap-3 p-3 mb-2 border-1 border-border rounded-xl transition-all duration-300 bg-card hover:bg-accent/5 backdrop-blur-sm'
        >
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex-1'>
                <h3 className='text-sm font-semibold text-card-foreground leading-tight mb-2 group-hover:text-primary transition-colors'>
                  {category_name}
                </h3>

                {/* Enhanced Pricing Section */}
                <div className='flex items-center gap-2 flex-wrap'>
                  {discount_price && discount_price < regular_price ? (
                    <>
                      <span className='text-lg font-bold text-primary'>৳{discount_price}</span>
                      <span className='text-sm text-muted-foreground line-through'>
                        ৳{regular_price}
                      </span>
                      <span className='inline-flex items-center px-2.5 py-1 text-xs font-semibold text-white bg-red-600 rounded-full shadow-sm'>
                        {Math.round(((regular_price - discount_price) / regular_price) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className='text-lg font-bold text-card-foreground text-green-500'>
                      ৳{regular_price}
                    </span>
                  )}
                </div>

                {/* Enhanced Savings Display */}
                {discount_price && discount_price < regular_price && (
                  <div className='mt-2 flex items-center gap-1.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg'>
                    <svg
                      className='w-4 h-4 text-emerald-700 flex-shrink-0'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='text-xs font-medium text-emerald-700 leading-tight'>
                      You save ৳{(regular_price - discount_price).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Enhanced Selection Indicator */}
              <div className='relative'>
                <div className='w-6 h-6 rounded-full border-2  transition-all duration-200 flex items-center justify-center'>
                  <div className='w-3 h-3 rounded-full bg-primary transition-all'></div>
                </div>
                {discount_price && discount_price < regular_price && (
                  <div className='absolute -top-[-6px] -right-[-6px] w-3 h-3 bg-destructive rounded-full'></div>
                )}
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ServiceAndPriceShowing;
