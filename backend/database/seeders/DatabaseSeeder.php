<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Episode;
use App\Models\PresidentialApplication;
use App\Models\Idea;
use App\Models\Subscriber;
use App\Models\Contact;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 0. Seed Admin Executive User
        User::updateOrCreate(
            ['email' => 'admin@ifiruled.world'],
            [
                'name' => 'Executive Administrator',
                'password' => Hash::make('presidential2026'),
            ]
        );

        // 1. Seed Episodes
        Episode::create([
            'slug' => 'ep-12-samiul-alam-economy',
            'episode_number' => 12,
            'title' => 'Abolishing Export Bureaucracy & 0% Tax for Tech Founders Under 25',
            'guest_name' => 'Samiul Alam',
            'guest_role' => 'FinTech Builder & Youth Economic Fellow',
            'guest_photo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
            'air_date' => 'August 27, 2026',
            'duration' => '32:15',
            'topic' => 'Economy',
            'executive_summary' => 'President Samiul tackled the slow licensing pipeline for youth startups, presenting a radical 1-day automated company formation law and sovereign venture guarantees.',
            'key_decrees' => [
                'Executive Decree 1: Single-window paperless export registration in under 60 minutes.',
                'Executive Decree 2: Sovereign seed liquidity pool for top 100 university inventions yearly.',
                'Executive Decree 3: Complete duty exemption on robotics and green hardware imports.'
            ],
            'youtube_id' => 'dQw4w9WgXcQ',
            'views_count' => 48200,
            'featured' => true,
            'quote' => 'If we make starting a business as simple as sending a text message, this generation will fund the nation’s next century.'
        ]);

        Episode::create([
            'slug' => 'ep-11-fariha-tasnim-education',
            'episode_number' => 11,
            'title' => 'Decentralizing University Curriculums & AI Tutors for 15,000 Rural Schools',
            'guest_name' => 'Fariha Tasnim',
            'guest_role' => 'AI Researcher & Rural Edu Advocate',
            'guest_photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
            'air_date' => 'August 20, 2026',
            'duration' => '29:40',
            'topic' => 'Education',
            'executive_summary' => 'President Fariha dismantled outdated national rote-learning curriculums, instituting real-world problem solving and multilingual AI tutors.',
            'key_decrees' => [
                'Executive Decree 1: Sovereign Open-Source AI Tutor deployed to all government primary classrooms.',
                'Executive Decree 2: Mandatory 20% industry internship credits for every undergrad graduation.',
                'Executive Decree 3: Doubling public teacher compensation indexed to student critical thinking milestones.'
            ],
            'youtube_id' => 'dQw4w9WgXcQ',
            'views_count' => 39500,
            'featured' => false,
            'quote' => 'A country where your geography dictates your intelligence access is a country with half its brain tied behind its back.'
        ]);

        Episode::create([
            'slug' => 'ep-10-rayhan-chowdhury-security',
            'episode_number' => 10,
            'title' => 'Digital Border Sovereignty & Judicial Automation for Instant Bail Decisions',
            'guest_name' => 'Rayhan Chowdhury',
            'guest_role' => 'Cyber Defense Specialist',
            'guest_photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
            'air_date' => 'August 13, 2026',
            'duration' => '31:05',
            'topic' => 'Security',
            'executive_summary' => 'Rayhan used his 30 minutes to modernize homeland digital infrastructure and overhaul pre-trial incarceration with automated bail triage.',
            'key_decrees' => [
                'Executive Decree 1: National Cyber Readiness Brigade with conscription exemptions for ethical hackers.',
                'Executive Decree 2: Automated AI triage for minor civil and bail hearings within 48 hours.'
            ],
            'youtube_id' => 'dQw4w9WgXcQ',
            'views_count' => 52100,
            'featured' => false,
            'quote' => 'National security in 2026 is fought in fiber optics and court dockets, not just perimeter fences.'
        ]);

        Episode::create([
            'slug' => 'ep-09-anika-rahman-environment',
            'episode_number' => 9,
            'title' => 'The Delta Defense Pact: Solar Water Desalination & Urban Flood Corridors',
            'guest_name' => 'Anika Rahman',
            'guest_role' => 'Climate Architect & Delta Fellow',
            'guest_photo' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
            'air_date' => 'August 6, 2026',
            'duration' => '33:12',
            'topic' => 'Environment',
            'executive_summary' => 'Anika laid out a resilient 50-year master plan to transform coastal vulnerability into a clean energy generation hub.',
            'key_decrees' => [
                'Executive Decree 1: Zero tax on rooftop solar and community microgrids.',
                'Executive Decree 2: Restoring historic river channels with strict penalties on industrial encroachers.'
            ],
            'youtube_id' => 'dQw4w9WgXcQ',
            'views_count' => 31400,
            'featured' => false,
            'quote' => 'We will not be climate victims; we will be the world’s leading exporters of delta engineering.'
        ]);

        Episode::create([
            'slug' => 'ep-08-tanvir-ahmed-foreign-policy',
            'episode_number' => 8,
            'title' => 'The Non-Aligned Digital Trade Alliance & Visa Free Regional Travel',
            'guest_name' => 'Tanvir Ahmed',
            'guest_role' => 'Diplomatic Policy Analyst',
            'guest_photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
            'air_date' => 'July 30, 2026',
            'duration' => '28:50',
            'topic' => 'Foreign Policy',
            'executive_summary' => 'President Tanvir challenged traditional geopolitical alliances, championing regional youth mobility and cross-border payment unification.',
            'key_decrees' => [
                'Executive Decree 1: Reciprocal 90-day visa-free travel for certified regional tech entrepreneurs.',
                'Executive Decree 2: Bilateral local-currency settlement agreements to reduce reserve dependency.'
            ],
            'youtube_id' => 'dQw4w9WgXcQ',
            'views_count' => 28900,
            'featured' => false,
            'quote' => 'Borders are lines on paper; economic opportunity flows where friction is eliminated.'
        ]);

        Episode::create([
            'slug' => 'ep-07-nusrat-jahan-social-justice',
            'episode_number' => 7,
            'title' => 'Universal Healthcare Smart ID & Citizen Right to Public Data Audit',
            'guest_name' => 'Dr. Nusrat Jahan',
            'guest_role' => 'Public Health Reformer',
            'guest_photo' => 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80',
            'air_date' => 'July 23, 2026',
            'duration' => '30:22',
            'topic' => 'Social Justice',
            'executive_summary' => 'Dr. Nusrat enacted a groundbreaking transparency mandate, granting every citizen real-time access to municipal public expenditure ledgers.',
            'key_decrees' => [
                'Executive Decree 1: National Health Digital Passport ensuring free emergency care at all hospitals.',
                'Executive Decree 2: Public Procurement Open Ledger accessible via standard mobile browser.'
            ],
            'youtube_id' => 'dQw4w9WgXcQ',
            'views_count' => 44100,
            'featured' => false,
            'quote' => 'Dignity is not a government gift; it is the fundamental obligation of public office.'
        ]);

        // 2. Seed Presidential Candidate Applications
        PresidentialApplication::create([
            'full_name' => 'Tanvir Hossain',
            'age' => 24,
            'email' => 'tanvir@techfellow.org',
            'phone' => '+880 1711 223344',
            'location' => 'Dhaka, Bangladesh',
            'topic' => 'Economy',
            'first_decree_title' => 'Sovereign Digital Freelancer Card & 0% Wire Fees',
            'manifesto' => 'Eliminate manual banking hurdles for 1M+ remote workers and provide automated foreign remittance clearance in under 10 seconds.',
            'pitch_url' => 'https://youtube.com/watch?v=dQw4w9WgXcQ',
            'linkedin' => 'https://linkedin.com/in/example',
            'social_handle' => '@tanvir_h',
            'status' => 'pending'
        ]);

        PresidentialApplication::create([
            'full_name' => 'Samira Chowdhury',
            'age' => 22,
            'email' => 'samira@deltawater.org',
            'phone' => '+880 1819 556677',
            'location' => 'Chittagong, Bangladesh',
            'topic' => 'Environment',
            'first_decree_title' => 'Coastal Tidal Energy Canals & Mangrove Buffer Zones',
            'manifesto' => 'Transform 500km of eroding coastline into kinetic tidal energy generation turbines while employing 50,000 coastal youth.',
            'pitch_url' => 'https://youtube.com/watch?v=dQw4w9WgXcQ',
            'linkedin' => 'https://linkedin.com/in/example',
            'social_handle' => '@samira_c',
            'status' => 'shortlisted'
        ]);

        // 3. Seed Crowdsourced Ideas Hub
        Idea::create([
            'author_name' => 'Tanzeem Hasan',
            'author_role' => 'Civil Engineering Student',
            'location' => 'Chittagong',
            'topic' => 'Environment',
            'title' => 'Solar Highway Canopies to Power Public Transit Grids',
            'content' => 'Cover high-capacity intercity expressways with arched solar panels. This generates over 450 MW of direct green electricity while reducing road surface heat and maintenance costs by 35%.',
            'upvotes' => 418,
            'is_approved' => true
        ]);

        Idea::create([
            'author_name' => 'Mehnaz Karim',
            'author_role' => 'Software Developer',
            'location' => 'Dhaka',
            'topic' => 'Economy',
            'title' => 'Zero Paperwork Freelancer Remittance Cards with Instant Cashbacks',
            'content' => 'Create a state-backed digital dollar debit card for tech freelancers with instant 4% export cashback and no manual bank clearance delays.',
            'upvotes' => 382,
            'is_approved' => true
        ]);

        Idea::create([
            'author_name' => 'Farhan Kabir',
            'author_role' => 'Legal Aid Volunteer',
            'location' => 'Sylhet',
            'topic' => 'Social Justice',
            'title' => 'Public Right to Video Record Civil Services Without Harassment',
            'content' => 'Codify into constitutional law that any citizen has the indisputable right to livestream their interaction with public officials in municipal and law enforcement offices.',
            'upvotes' => 620,
            'is_approved' => true
        ]);

        Idea::create([
            'author_name' => 'Sadia Afroz',
            'author_role' => 'Medical Intern',
            'location' => 'Rajshahi',
            'topic' => 'Education',
            'title' => 'Free High-Speed Starlink/Fiber in Every Rural Health Clinic',
            'content' => 'Equip every union parishad health sub-center with high-speed satellite uplink connected to tertiary specialist doctors in major teaching hospitals for instant emergency diagnosis.',
            'upvotes' => 295,
            'is_approved' => true
        ]);

        // 4. Seed Subscribers
        Subscriber::create(['email' => 'founder@dhakaventure.com', 'is_active' => true]);
        Subscriber::create(['email' => 'policy@reformthinktank.org', 'is_active' => true]);
        Subscriber::create(['email' => 'student.leader@buet.ac.bd', 'is_active' => true]);
        Subscriber::create(['email' => 'editor@nationalmedia.net', 'is_active' => true]);

        // 5. Seed Contacts
        Contact::create([
            'name' => 'Mahbubur Rahman',
            'email' => 'mahbub@venturecapital.com',
            'inquiry_type' => 'Sponsorship',
            'message' => 'We want to sponsor the upcoming Season 2 Economy Series and offer a $50K seed grant to the winning decrees.'
        ]);

        Contact::create([
            'name' => 'Farzana Haque',
            'email' => 'farzana@dailygazette.com',
            'inquiry_type' => 'Press',
            'message' => 'Requesting a feature interview with the show host regarding youth political mobilization.'
        ]);

        // 6. Seed System Settings
        Setting::set('is_live', 'false');
        Setting::set('live_stream_url', 'https://youtube.com/live/dQw4w9WgXcQ');
        Setting::set('next_broadcast_datetime', '2026-09-03 20:00:00');
        Setting::set('broadcast_notice', 'Every Thursday • 8:00 PM BST on ifiruled.world');
    }
}
