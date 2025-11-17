import Image from 'next/image';
import React from 'react';

interface TournamentRule {
  rule: string;
}

interface TournamentRuleGroup {
  title: string;
  rules: TournamentRule[];
}

interface Props {
  tournament_rules: TournamentRuleGroup[];
}

const AnnounceBoard = ({ tournament_rules }: Props) => {
  const ruleGroup = tournament_rules?.[0];
  const title = ruleGroup?.title;
  const rules = ruleGroup?.rules || [];

  // Split rules into two equal columns
  const mid = Math.ceil(rules.length / 2);
  const leftRules = rules.slice(0, mid);
  const rightRules = rules.slice(mid);

  return (
    <section className='py-16 relative text-center bg-cover bg-center px-4 sm:px-6 lg:px-0'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center -z-10'
        style={{
          backgroundImage: "url('/bccImages/announceBoard.png')",
          transform: 'rotate(180deg)',
        }}
      />

      {/* Heading */}
      <h2 className='text-4xl md:text-5xl font-bebas font-bold text-blue-950 flex justify-center items-center gap-3'>
        Announce Board
        <Image width={40} height={30} src='/bccImages/announce.png' alt='icon' />
      </h2>

      <p className='text-3xl sm:text-3xl md:text-4xl font-bebas font-bold text-orange-500 mt-2'>
        Rules of BCC Fan’s Tournament - 2025
      </p>

      {/* Rules */}
      <div className='mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-5xl mx-auto text-left'>
        {/* Left Column */}
        <div className='space-y-3 sm:space-y-4 text-base sm:text-lg leading-6 sm:leading-7 md:border-r md:border-gray-500 md:pr-5'>
          <p>{title}</p>
          <ol className='list-decimal list-inside space-y-1 sm:space-y-2'>
            {leftRules.map((item, index) => (
              <li key={index}>{item.rule}</li>
            ))}
          </ol>
        </div>

        {/* Right Column */}
        <div className='space-y-3 sm:space-y-4 text-base sm:text-lg leading-6 sm:leading-7 md:pl-5'>
          <p className='md:opacity-0'>{title}</p>
          <ol className='list-decimal list-inside space-y-1 sm:space-y-2'>
            {rightRules.map((item, index) => (
              <li key={index}>{item.rule}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AnnounceBoard;
