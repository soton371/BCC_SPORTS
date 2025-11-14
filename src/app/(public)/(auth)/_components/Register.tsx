import React from 'react';

const Register = () => {
  return (
    <div className='w-full container mx-auto flex flex-col justify-center py-10'>
      {/* HEADER */}
      <div className='py-5 bg-green-600 rounded-2xl text-center text-white relative overflow-hidden'>
        <h1 className='text-5xl md:text-7xl font-bebas font-bold'>BCC Fan’s Tournament - 2025</h1>
        <p className='text-2xl mt-1 font-light'>Registration now</p>

        <img
          src='/bccImages/single_cup.png'
          className='absolute right-4 -top-6 w-36 h-36'
          alt='badge'
        />
      </div>

      {/* BODY */}
      <div className='flex flex-col lg:flex-row gap-4 mt-6'>
        {/* LEFT FORM */}
        <div className='relative w-full max-w-[750px] p-6 bg-white rounded-2xl outline outline-[0.5px] outline-black overflow-hidden order-2 lg:order-1'>
          {/* Green blur background */}
          <div className='absolute -top-10 -left-10 w-[450px] h-[450px] bg-green-600/40 rounded-full blur-[200px] pointer-events-none' />

          {/* FORM BODY */}
          <div className='mt-6 space-y-6'>
            {/* Row 1 */}
            <div className='flex gap-4 flex-wrap'>
              <div className='flex flex-col gap-2 w-full md:w-[48%]'>
                <label className='text-base font-medium'>Type your name*</label>
                <input
                  className='px-4 py-3 bg-neutral-50 border border-blue-950 rounded-lg'
                  placeholder='Type your name'
                />
              </div>

              <div className='flex flex-col gap-2 w-full md:w-[48%]'>
                <label className='text-base font-medium'>Select your role*</label>
                <select className='px-4 py-3 bg-neutral-50 border border-blue-950 rounded-lg'>
                  <option>All rounder</option>
                  <option>Batsman</option>
                  <option>Bowler</option>
                  <option>Wicket Keeper</option>
                  <option>Fielder</option>
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className='flex gap-4 flex-wrap'>
              <div className='flex flex-col gap-2 w-full md:w-[48%]'>
                <label className='text-base font-medium'>Add your mobile number*</label>
                <input
                  className='px-4 py-3 bg-neutral-50 border border-blue-950 rounded-lg'
                  placeholder='01XXXXXXXXX'
                />
              </div>

              <div className='flex flex-col gap-2 w-full md:w-[48%]'>
                <label className='text-base font-medium'>Type your location*</label>
                <input
                  className='px-4 py-3 bg-neutral-50 border border-blue-950 rounded-lg'
                  placeholder='Village'
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className='flex gap-4 flex-wrap'>
              <div className='flex flex-col gap-2 w-full md:w-[48%]'>
                <label className='text-base font-medium'>Select your team*</label>
                <select className='px-4 py-3 bg-neutral-50 border border-blue-950 rounded-lg'>
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>Pakistan</option>
                  <option>Sri Lanka</option>
                </select>
              </div>

              <div className='flex flex-col gap-2 w-full md:w-[48%]'>
                <label className='text-base font-medium'>bKash transaction ID*</label>
                <input
                  className='px-4 py-3 bg-neutral-50 border border-blue-950 rounded-lg'
                  placeholder='Transaction ID'
                />
              </div>
            </div>

            {/* Upload Picture */}
            <div className='flex flex-col gap-2'>
              <label className='text-base font-medium'>Upload your picture*</label>

              <div className='border border-blue-950 bg-neutral-50 rounded-lg px-4 py-6 text-center flex flex-col items-center gap-2'>
                <p className='text-zinc-700 text-base'>Upload your picture</p>
                <p className='text-zinc-600 text-sm opacity-80'>
                  (Upload a clear photo wearing your team jersey)
                </p>

                <input type='file' className='mt-3' />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button className='mt-8 w-full bg-blue-950 text-white py-3.5 rounded-lg text-lg font-medium'>
            Submit
          </button>
        </div>

        {/* RIGHT RULES BOX */}
        <div className='w-full lg:w-[460px] bg-neutral-50/95 rounded-2xl border border-green-600 p-5 overflow-y-auto order-1 lg:order-2'>
          <div className='px-4 py-2 bg-orange-500 rounded-lg text-center text-white text-sm font-medium'>
            Fans Tournament 2025 – রেজিস্ট্রেশন নিয়মাবলি
          </div>

          <div className='mt-2 text-sm leading-7 text-black'>
            <p>
              1. আপনার নাম এবং আপনার রোল নির্বাচন করুন — (ব্যাটার / বোলার / ফিল্ডার / উইকেট কিপার /
              অলরাউন্ডার)
            </p>
            <p>2. আপনার ফোন নাম্বার এবং লোকেশন (গ্রামের নাম) লিখুন।</p>
            <p>3. আপনার টিম সিলেক্ট করুন।</p>

            <p className=''>4. পেমেন্ট সিস্টেম:</p>

            <ul className='list-disc list-inside text-black'>
              <li>
                রেজিস্ট্রেশন ফি Send Money করুন 👉 <b>01777-327280</b> নম্বরে।
              </li>
              <li>পেমেন্ট সম্পন্ন হলে আপনার Transaction ID কপি করুন।</li>
              <li>এরপর ফর্মের “bKash Transaction ID” ইনপুট ফিল্ডে সেই নম্বরটি পেস্ট করুন।</li>
            </ul>
            <p>5. আপনার প্রিয় টিমের জার্সি পরে একটি স্পষ্ট ছবি দিন।</p>
            <p>6. সবশেষে ফর্ম সাবমিট করুন এবং ভেরিফিকেশনের জন্য অপেক্ষা করুন।</p>
            <p className='text-red-600 font-semibold mt-2'>
              📢 বিঃদ্রঃ উপরের যেকোনো ধাপ ভুল হলে রেজিস্ট্রেশন বাতিল হবে।
            </p>

            <p className='mt-2'>
              প্রয়োজনেঃ <br />
              (তুর্য্য) ০১৭৭৭-৩২৭২৮০ <br />
              (ছোটন) ০১৫১৮-৬০৬৩৯৯
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
