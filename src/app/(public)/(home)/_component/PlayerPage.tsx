'use client';

import { useState } from 'react';
import {
  useGetPlayerQuery,
  useGetTournamentQuery,
  useLazyGetPlayerCheckQuery,
} from '@/lib/APIs/common-api';

const PlayerPage = () => {
  const [activeTab, setActiveTab] = useState('players'); // active tab state

  return (
    <div className='container mx-auto flex flex-col items-center gap-6 md:gap-8'>
      <PlayerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='w-full max-w-6xl'>
        {activeTab === 'players' && <PlayerList />}
        {activeTab === 'status' && <CheckStatus />}
      </div>
    </div>
  );
};

export default PlayerPage;

// --------------------- Tabs ---------------------
interface PlayerTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PlayerTabs = ({ activeTab, setActiveTab }: PlayerTabsProps) => {
  const tabs = [
    { id: 'players', label: 'Player List' },
    { id: 'team_list', label: 'Team List' },
    { id: 'status', label: 'Check Your Status' },
  ];

  return (
    <div className='border-b-[0.40px] border-b-gray-200 w-full flex justify-center gap-8'>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 flex justify-center items-center cursor-pointer ${
            activeTab === tab.id ? 'border-b-4 border-orange-500' : ''
          }`}
        >
          <p
            className={`text-lg font-normal leading-7 ${
              activeTab === tab.id ? 'text-orange-500' : 'text-blue-950'
            }`}
          >
            {tab.label}
          </p>
        </div>
      ))}
    </div>
  );
};

// --------------------- Player List Table ---------------------
const PlayerList = () => {
  const { data, isLoading, isError, error } = useGetPlayerQuery({});

  if (isLoading) return <p className='text-center text-gray-500 py-10'>Loading players...</p>;

  if (isError)
    return (
      <p className='text-center text-red-600 py-10'>
        {(error as any)?.data?.message || 'Failed to load players.'}
      </p>
    );

  return (
    <div className='w-full overflow-x-auto shadow-md rounded-lg'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>SL</th>
            <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Image</th>
            <th className='px-4 py-3 text-left text-sm font-medium text-blue-950'>Name</th>
            <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>Phone</th>
            <th className='px-4 py-3 text-left text-sm font-medium text-orange-500'>Role</th>
            <th className='px-4 py-3 text-left text-sm font-medium text-indigo-600'>Team</th>
            <th className='px-4 py-3 text-left text-sm font-medium text-yellow-500'>Status</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data?.map((player: any, index: number) => (
            <tr key={player.id} className='hover:bg-gray-50 transition'>
              <td className='px-4 py-2 font-semibold text-gray-900'>{index + 1}</td>
              <td className='px-4 py-2'>
                {player.image ? (
                  <img
                    src={player.image}
                    alt={player.name}
                    className='w-12 h-12 object-cover rounded-full'
                  />
                ) : (
                  '—'
                )}
              </td>
              <td className='px-4 py-2 text-blue-950 font-semibold'>{player.name}</td>
              <td className='px-4 py-2 text-gray-700'>{player.phone}</td>
              <td className='px-4 py-2 text-orange-500'>{player.role?.name}</td>
              <td className='px-4 py-2 text-indigo-600'>{player.team?.name}</td>
              <td
                className={`px-4 py-2 font-semibold ${
                  player.status === 'pending'
                    ? 'text-yellow-500'
                    : player.status === 'approved'
                      ? 'text-green-600'
                      : 'text-red-600'
                }`}
              >
                {player.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --------------------- Check Status ---------------------

interface FilterValues {
  phone: string;
  bkash_transaction_id: string;
  tournament: string;
}

export const CheckStatus = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const [checkStatus, { data: players, isLoading: isLoadingPlayers, isError }] =
    useLazyGetPlayerCheckQuery();
  const { data: tournaments, isLoading: isLoadingTournaments } = useGetTournamentQuery();

  const [filters, setFilters] = useState<FilterValues>({
    phone: '',
    bkash_transaction_id: '',
    tournament: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage('');

    if (!filters.tournament) {
      setErrorMessage('Tournament is required.');
      return;
    }

    if (!filters.phone && !filters.bkash_transaction_id) {
      setErrorMessage('Please enter either Phone or Bkash Transaction ID.');
      return;
    }

    // Trigger lazy query with filters
    await checkStatus({
      tournament: filters.tournament,
      phone: filters.phone,
      bkash_transaction_id: filters.bkash_transaction_id,
    });
  };

  if (isLoadingPlayers || isLoadingTournaments)
    return <p className='text-center text-gray-500 py-10'>Loading...</p>;

  if (isError) return <p className='text-center text-red-600 py-10'>Failed to load data.</p>;

  return (
    <div className='w-full overflow-x-auto shadow-md rounded-lg p-4'>
      {/* Search Form */}
      <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-3 mb-4 items-end'>
        <div className='flex flex-col w-full md:w-1/3'>
          <label className='text-sm font-medium text-gray-700 mb-1'>Phone</label>
          <input
            type='text'
            name='phone'
            value={filters.phone}
            onChange={handleChange}
            placeholder='Enter phone'
            className='px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-orange-500'
          />
        </div>
        <div className='flex flex-col w-full md:w-1/3'>
          <label className='text-sm font-medium text-gray-700 mb-1'>Bkash Transaction ID</label>
          <input
            type='text'
            name='bkash_transaction_id'
            value={filters.bkash_transaction_id}
            onChange={handleChange}
            placeholder='Enter Bkash Transaction ID'
            className='px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-orange-500'
          />
        </div>
        <div className='flex flex-col w-full md:w-1/3'>
          <label className='text-sm font-medium text-gray-700 mb-1'>Tournament *</label>
          <select
            name='tournament'
            value={filters.tournament}
            onChange={handleChange}
            required
            className='px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-orange-500'
          >
            <option value=''>Select Tournament</option>
            {tournaments?.map((t: any) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition'
        >
          Search
        </button>
      </form>
      {errorMessage && <p className='text-center text-red-600 mb-2'>{errorMessage}</p>}

      {/* Table */}
      {!players || players.length === 0 ? (
        <p className='text-center text-gray-500 py-10'>Coming Soon...</p>
      ) : (
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>SL</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Image</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-blue-950'>Name</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-yellow-500'>Status</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-700'>Phone</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-purple-500'>Bkash Txn</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-indigo-600'>Team</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-orange-500'>Role</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {players.map((player: any, index: number) => (
              <tr key={player.id} className='hover:bg-gray-50 transition'>
                <td className='px-4 py-2 font-semibold text-gray-900'>{index + 1}</td>
                <td className='px-4 py-2'>
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name}
                      className='w-12 h-12 object-cover rounded-full'
                    />
                  ) : (
                    '—'
                  )}
                </td>
                <td className='px-4 py-2 text-blue-950 font-semibold'>{player.name}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    player.status === 'pending'
                      ? 'text-yellow-500'
                      : player.status === 'approved'
                        ? 'text-green-600'
                        : 'text-red-600'
                  }`}
                >
                  {player.status}
                </td>
                <td className='px-4 py-2 text-gray-700'>{player.phone}</td>
                <td className='px-4 py-2 text-purple-500'>{player.bkash_transaction_id}</td>
                <td className='px-4 py-2 text-indigo-600'>{player.team?.name}</td>
                <td className='px-4 py-2 text-orange-500'>{player.role?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// --------------------- Search Tab ---------------------
const PlayerSearchBar = () => {
  return (
    <div className='w-full max-w-4xl mx-auto p-3 md:p-4 bg-white rounded-2xl shadow-md'>
      <div className='pl-4 pr-3 py-2 bg-zinc-100 rounded-lg flex items-center gap-2'>
        <span className='text-xl'>🔍</span>
        <input
          type='text'
          placeholder='Search players by phone number...'
          className='bg-transparent w-full outline-none text-sm text-gray-600'
        />
      </div>
    </div>
  );
};
