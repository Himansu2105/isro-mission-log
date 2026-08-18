/* ===================== ISRO Mission Log — CRUD logic ===================== */

const STORAGE_KEY = 'isro-mission-log.missions.v2';

const SEED_MISSIONS = [
  {
    id: "seed-1975-aryabhata",
    name: "Aryabhata",
    vehicle: "Kosmos-3M (Soviet rocket)",
    status: "Completed",
    date: "1975-04-19",
    site: "Kapustin Yar, USSR",
    category: "Astronomy",
    payload: "India's first satellite; X-ray astronomy, aeronomy and solar physics experiments",
    notes: [
      "Named after the ancient Indian mathematician and astronomer Aryabhata.",
      "Built by ISRO but launched aboard a Soviet rocket under a cooperative agreement.",
      "A power failure on the fourth day limited most experiments."
    ],
    flagship: true
  },
  {
    id: "seed-1979-bhaskara1",
    name: "Bhaskara-I",
    vehicle: "Kosmos-3M (Soviet rocket)",
    status: "Completed",
    date: "1979-06-07",
    site: "Kapustin Yar, USSR",
    category: "Earth Observation",
    payload: "India's first experimental Earth observation satellite",
    notes: [
      "Carried TV cameras for hydrology, forestry and geology studies.",
      "Also carried a satellite microwave radiometer (SAMIR) for oceanography."
    ],
    flagship: false
  },
  {
    id: "seed-1980-rohini",
    name: "Rohini RS-1",
    vehicle: "SLV-3",
    status: "Completed",
    date: "1980-07-18",
    site: "Sriharikota Range (SHAR)",
    category: "Technology Demo",
    payload: "Technology demonstrator for indigenous orbital launch capability",
    notes: [
      "First satellite placed into orbit by an entirely Indian-built launch vehicle.",
      "Made India the sixth nation to achieve independent orbital launch capability."
    ],
    flagship: true
  },
  {
    id: "seed-1983-insat1b",
    name: "INSAT-1B",
    vehicle: "Space Shuttle Challenger (STS-8)",
    status: "Completed",
    date: "1983-08-30",
    site: "Kennedy Space Centre, USA",
    category: "Communication",
    payload: "Multipurpose communications, broadcasting and meteorology satellite",
    notes: [
      "Anchored the INSAT system that transformed Indian television and telecom.",
      "Carried a Very High Resolution Radiometer for weather imaging."
    ],
    flagship: false
  },
  {
    id: "seed-1988-irs1a",
    name: "IRS-1A",
    vehicle: "Vostok (Soviet rocket)",
    status: "Completed",
    date: "1988-03-17",
    site: "Baikonur Cosmodrome, USSR",
    category: "Earth Observation",
    payload: "India's first operational remote sensing satellite",
    notes: [
      "Founding satellite of the Indian Remote Sensing (IRS) programme.",
      "Provided data for agriculture, forestry and water resource mapping."
    ],
    flagship: false
  },
  {
    id: "seed-1993-pslvd1",
    name: "PSLV-D1 / IRS-1E",
    vehicle: "PSLV (development flight)",
    status: "Failed",
    date: "1993-09-20",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "First developmental flight of the PSLV",
    notes: [
      "A software error in the attitude correction logic caused a failure to reach orbit.",
      "Lessons from this flight fed directly into the successful PSLV-D2 mission."
    ],
    flagship: false
  },
  {
    id: "seed-1994-pslvd2",
    name: "PSLV-D2 / IRS-P2",
    vehicle: "PSLV",
    status: "Completed",
    date: "1994-10-15",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "First fully successful PSLV flight, carrying the IRS-P2 remote sensing satellite",
    notes: [
      "Validated the PSLV design after the D1 failure.",
      "Began the run that made PSLV one of the most reliable launch vehicles in the world."
    ],
    flagship: true
  },
  {
    id: "seed-2001-gslvd1",
    name: "GSLV-D1 / GSAT-1",
    vehicle: "GSLV Mk I",
    status: "Completed",
    date: "2001-04-18",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Communication",
    payload: "First developmental flight of the Geosynchronous Satellite Launch Vehicle",
    notes: [
      "Demonstrated indigenous capability to loft heavier geostationary payloads.",
      "GSAT-1 reached a slightly lower-than-planned orbit but validated the vehicle."
    ],
    flagship: false
  },
  {
    id: "seed-2008-chandrayaan1",
    name: "Chandrayaan-1",
    vehicle: "PSLV-C11",
    status: "Completed",
    date: "2008-10-22",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Lunar",
    payload: "India's first mission to the Moon; orbiter and Moon Impact Probe",
    notes: [
      "Instruments detected water molecules in the lunar surface, a landmark finding.",
      "Mission ended early in August 2009 after loss of radio contact, but primary objectives were met."
    ],
    flagship: true
  },
  {
    id: "seed-2010-gslvd3",
    name: "GSLV-D3 / GSAT-4",
    vehicle: "GSLV Mk II",
    status: "Failed",
    date: "2010-04-15",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Communication",
    payload: "First flight of the indigenous cryogenic upper stage",
    notes: [
      "The indigenous cryogenic engine underperformed, and the mission was lost.",
      "Drove years of further cryogenic stage development before the technology matured."
    ],
    flagship: false
  },
  {
    id: "seed-2013-mom",
    name: "Mars Orbiter Mission (Mangalyaan)",
    vehicle: "PSLV-C25",
    status: "Completed",
    date: "2013-11-05",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Interplanetary",
    payload: "India's first interplanetary mission, to study Mars' surface and atmosphere",
    notes: [
      "Made India the first Asian nation to reach Mars orbit.",
      "India became the first country to succeed on its maiden Mars attempt.",
      "One of the most cost-effective interplanetary missions ever flown."
    ],
    flagship: true
  },
  {
    id: "seed-2014-lvm3x",
    name: "LVM3-X / CARE",
    vehicle: "LVM3 (experimental flight)",
    status: "Completed",
    date: "2014-12-18",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Technology Demo",
    payload: "Sub-orbital test of India's heaviest launch vehicle and a crew module atmospheric re-entry experiment",
    notes: [
      "Validated the LVM3 (then GSLV Mk III) atmospheric flight profile.",
      "CARE capsule re-entered and splashed down safely in the Bay of Bengal."
    ],
    flagship: false
  },
  {
    id: "seed-2015-astrosat",
    name: "AstroSat",
    vehicle: "PSLV-C30",
    status: "Completed",
    date: "2015-09-28",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Astronomy",
    payload: "India's first dedicated multi-wavelength space observatory",
    notes: [
      "Observes simultaneously across X-ray, UV and visible bands.",
      "Continues to return astronomical data well beyond its planned mission life."
    ],
    flagship: true
  },
  {
    id: "seed-2017-pslvc37",
    name: "PSLV-C37 / Cartosat-2D",
    vehicle: "PSLV-XL",
    status: "Completed",
    date: "2017-02-15",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Cartosat-2D primary payload plus a record-setting rideshare of international satellites",
    notes: [
      "Deployed 104 satellites in a single launch, a world record at the time.",
      "Showcased ISRO as a major commercial rideshare launch provider."
    ],
    flagship: false
  },
  {
    id: "seed-2019-chandrayaan2",
    name: "Chandrayaan-2",
    vehicle: "GSLV Mk III-M1",
    status: "Failed",
    date: "2019-07-22",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Lunar",
    payload: "Lunar orbiter, Vikram lander and Pragyan rover",
    notes: [
      "Orbiter successfully entered lunar orbit and remains operational, returning valuable data.",
      "The Vikram lander lost communication during final descent and crash-landed on Sep 6, 2019.",
      "Findings directly informed the successful Chandrayaan-3 lander design."
    ],
    flagship: true
  },
  {
    id: "seed-2023-chandrayaan3",
    name: "Chandrayaan-3",
    vehicle: "LVM3-M4",
    status: "Completed",
    date: "2023-07-14",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Lunar",
    payload: "Soft landing near lunar south pole; Pragyan rover surface experiments",
    notes: [
      "Launch nominal, injected into Earth orbit as planned.",
      "Lunar orbit insertion successful on Aug 5, 2023.",
      "Vikram lander touched down near the south pole on Aug 23, 2023.",
      "India became the fourth nation to soft-land on the Moon and the first near the south pole."
    ],
    flagship: true
  },
  {
    id: "seed-2023-adityal1",
    name: "Aditya-L1",
    vehicle: "PSLV-C57",
    status: "Active",
    date: "2023-09-02",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Astronomy",
    payload: "India's first dedicated solar observatory, stationed at the Sun-Earth L1 point",
    notes: [
      "Successfully inserted into halo orbit around L1 on Jan 6, 2024.",
      "All seven payloads reported healthy and returning data.",
      "Continuing to monitor the solar corona, wind and coronal mass ejections."
    ],
    flagship: true
  },
  {
    id: "seed-2023-gaganyaan-tvd1",
    name: "Gaganyaan TV-D1",
    vehicle: "Test Vehicle (single-stage liquid rocket)",
    status: "Completed",
    date: "2023-10-21",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Human Spaceflight",
    payload: "Crew escape system abort demonstration for the Gaganyaan human spaceflight programme",
    notes: [
      "Successfully demonstrated the crew module abort and safe recovery sequence.",
      "A key safety milestone ahead of uncrewed and crewed Gaganyaan flights."
    ],
    flagship: false
  },
  {
    id: "seed-2024-xposat",
    name: "XPoSat",
    vehicle: "PSLV-C58",
    status: "Active",
    date: "2024-01-01",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Astronomy",
    payload: "X-ray Polarimeter Satellite studying black holes and neutron stars",
    notes: [
      "India's first dedicated mission to study polarisation of X-ray emissions from celestial sources.",
      "Complements international observatories studying extreme astrophysical objects."
    ],
    flagship: false
  },
  {
    id: "seed-2024-insat3ds",
    name: "INSAT-3DS",
    vehicle: "GSLV-F14",
    status: "Completed",
    date: "2024-02-17",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Next-generation meteorological satellite for weather forecasting and disaster warning",
    notes: [
      "Reached geostationary orbit and began operational weather imaging.",
      "Strengthens India’s cyclone and monsoon forecasting capability."
    ],
    flagship: false
  },
  {
    id: "seed-2024-eos08",
    name: "EOS-08",
    vehicle: "SSLV-D3",
    status: "Completed",
    date: "2024-08-16",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Earth observation microsatellite; also the final qualification flight of the SSLV",
    notes: [
      "Confirmed the Small Satellite Launch Vehicle (SSLV) ready for operational use.",
      "Carried infrared and global navigation payloads for disaster monitoring."
    ],
    flagship: false
  },
  {
    id: "seed-2024-spadex",
    name: "SPADEX",
    vehicle: "PSLV-C60",
    status: "Completed",
    date: "2024-12-30",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Technology Demo",
    payload: "Space Docking Experiment: two small satellites demonstrating autonomous rendezvous and docking",
    notes: [
      "India became the fourth nation to demonstrate autonomous orbital docking.",
      "A critical technology stepping stone for Chandrayaan-4 and a future Indian space station."
    ],
    flagship: true
  },
  {
    id: "seed-2025-eos09",
    name: "EOS-09 (RISAT-1B)",
    vehicle: "PSLV-C61",
    status: "Failed",
    date: "2025-05-18",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "All-weather radar imaging satellite for disaster response and surveillance",
    notes: [
      "First and second stages performed nominally.",
      "A drop in third-stage motor chamber pressure led to loss of mission.",
      "Only the third PSLV failure since the vehicle entered service in 1993."
    ],
    flagship: false
  },
  {
    id: "seed-2025-axiom4",
    name: "Axiom Mission 4",
    vehicle: "Falcon 9 (Axiom Space / SpaceX)",
    status: "Completed",
    date: "2025-06-25",
    site: "Kennedy Space Centre, USA",
    category: "Human Spaceflight",
    payload: "India's first astronaut aboard the ISS in over four decades, via a commercial partner mission",
    notes: [
      "Astronaut Shubhanshu Shukla spent 18 days aboard the ISS, returning on Jul 15, 2025.",
      "Conducted experiments on muscle atrophy, microbial behaviour and crop growth in microgravity.",
      "Supported preparation for the independent Gaganyaan human spaceflight programme."
    ],
    flagship: true
  },
  {
    id: "seed-2025-nisar",
    name: "NISAR",
    vehicle: "GSLV-F16",
    status: "Active",
    date: "2025-07-30",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Joint NASA-ISRO dual-frequency synthetic aperture radar for global Earth observation",
    notes: [
      "Landmark joint mission combining NASA L-band and ISRO S-band radar systems.",
      "Monitors ecosystems, ice sheets, and ground deformation from earthquakes and volcanoes."
    ],
    flagship: true
  },
  {
    id: "seed-2026-gaganyaan-g1",
    name: "Gaganyaan G1",
    vehicle: "LVM3",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Human Spaceflight",
    payload: "First uncrewed orbital test flight ahead of the first crewed Gaganyaan mission",
    notes: [
      "Crew module and life-support systems undergoing final qualification.",
      "To be followed by G2 and further uncrewed tests before a crewed flight."
    ],
    flagship: true
  },
  {
    id: "seed-planned-chandrayaan4",
    name: "Chandrayaan-4",
    vehicle: "LVM3 (multiple launches)",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Lunar",
    payload: "Lunar sample return mission, targeting the Moon’s south pole",
    notes: [
      "Approved by the Indian government as a multi-module, multi-launch mission.",
      "Builds directly on docking technology proven by the SPADEX mission."
    ],
    flagship: true
  },
  {
    id: "seed-1992-insat2a",
    name: "INSAT-2A",
    vehicle: "Ariane-44L",
    status: "Completed",
    date: "1992-07-10",
    site: "Kourou, French Guiana",
    category: "Communication",
    payload: "First satellite of the indigenously built INSAT-2 series for telecom, TV and meteorology",
    notes: [
      "Marked the shift from imported INSAT-1 satellites to India-built INSAT-2 platforms.",
      "Carried transponders for telecommunication and a Very High Resolution Radiometer."
    ],
    flagship: false
  },
  {
    id: "seed-2002-kalpana1",
    name: "Kalpana-1 (MetSat-1)",
    vehicle: "PSLV-C4",
    status: "Completed",
    date: "2002-09-12",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "India's first dedicated meteorological satellite",
    notes: [
      "Renamed Kalpana-1 in honour of astronaut Kalpana Chawla.",
      "Provided cyclone tracking and monsoon monitoring for the Indian subcontinent."
    ],
    flagship: false
  },
  {
    id: "seed-2003-resourcesat1",
    name: "Resourcesat-1 (IRS-P6)",
    vehicle: "PSLV-C5",
    status: "Completed",
    date: "2003-10-17",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "High-resolution agricultural and land resource imaging satellite",
    notes: [
      "Continued and improved on the IRS remote sensing series.",
      "Widely used for crop acreage and drought monitoring."
    ],
    flagship: false
  },
  {
    id: "seed-2004-edusat",
    name: "EDUSAT (GSAT-3)",
    vehicle: "GSLV-F01",
    status: "Completed",
    date: "2004-09-20",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Communication",
    payload: "India's first satellite built exclusively for educational services",
    notes: [
      "Delivered satellite-based distance education to schools and colleges nationwide.",
      "Operated for over a decade before decommissioning."
    ],
    flagship: false
  },
  {
    id: "seed-2005-cartosat1",
    name: "Cartosat-1",
    vehicle: "PSLV-C6",
    status: "Completed",
    date: "2005-05-05",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Stereoscopic high-resolution mapping satellite",
    notes: [
      "First Indian satellite with stereo imaging for cartography and terrain modelling.",
      "Supported large-scale topographic mapping of India."
    ],
    flagship: false
  },
  {
    id: "seed-2007-cartosat2",
    name: "Cartosat-2",
    vehicle: "PSLV-C7",
    status: "Completed",
    date: "2007-01-10",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Sub-metre resolution panchromatic imaging satellite",
    notes: [
      "Began the long-running Cartosat-2 series of high-resolution imaging satellites.",
      "Also carried India’s first re-entry capsule test payload on the same mission."
    ],
    flagship: false
  },
  {
    id: "seed-2009-risat2",
    name: "RISAT-2",
    vehicle: "PSLV-C12",
    status: "Completed",
    date: "2009-04-20",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "All-weather radar imaging satellite for border surveillance and disaster monitoring",
    notes: [
      "Fast-tracked into service for surveillance needs.",
      "Provided imaging capability regardless of cloud cover or time of day."
    ],
    flagship: false
  },
  {
    id: "seed-2009-oceansat2",
    name: "Oceansat-2",
    vehicle: "PSLV-C14",
    status: "Completed",
    date: "2009-09-23",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Ocean colour, sea surface wind and ocean state monitoring satellite",
    notes: [
      "Supported fisheries advisories and coastal zone studies.",
      "Continued the Oceansat programme begun in 1999."
    ],
    flagship: false
  },
  {
    id: "seed-2011-meghatropiques",
    name: "Megha-Tropiques",
    vehicle: "PSLV-C18",
    status: "Completed",
    date: "2011-10-12",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Joint ISRO-CNES mission studying tropical climate and the water cycle",
    notes: [
      "Focused on tropical convection, water vapour and energy exchange.",
      "A collaboration between ISRO and the French space agency CNES."
    ],
    flagship: false
  },
  {
    id: "seed-2012-risat1",
    name: "RISAT-1",
    vehicle: "PSLV-C19",
    status: "Completed",
    date: "2012-04-26",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "India's first indigenously built synthetic aperture radar imaging satellite",
    notes: [
      "Provided all-weather agricultural and disaster-monitoring imagery.",
      "A major step in indigenous radar imaging technology."
    ],
    flagship: false
  },
  {
    id: "seed-2013-saral",
    name: "SARAL",
    vehicle: "PSLV-C20",
    status: "Completed",
    date: "2013-02-25",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Joint ISRO-CNES altimetry satellite for ocean and sea-level studies",
    notes: [
      "Carried the French Ka-band Altika altimeter for precise sea surface height measurement.",
      "Data used in climate research and ocean forecasting."
    ],
    flagship: false
  },
  {
    id: "seed-2013-irnss1a",
    name: "IRNSS-1A",
    vehicle: "PSLV-C22",
    status: "Completed",
    date: "2013-07-01",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Navigation",
    payload: "First satellite of the Indian Regional Navigation Satellite System (NavIC)",
    notes: [
      "Founding satellite of what became the seven-satellite NavIC constellation.",
      "Provides position and timing services over India and surrounding regions."
    ],
    flagship: true
  },
  {
    id: "seed-2014-2016-irnss-b-g",
    name: "IRNSS-1B to 1G (NavIC Constellation)",
    vehicle: "PSLV (multiple flights)",
    status: "Completed",
    date: "2016-04-28",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Navigation",
    payload: "Remaining six satellites completing the operational NavIC regional navigation constellation",
    notes: [
      "Launched across separate PSLV missions between 2014 and 2016.",
      "Completed India’s independent regional satellite navigation system, NavIC."
    ],
    flagship: true
  },
  {
    id: "seed-2015-gsat6",
    name: "GSAT-6",
    vehicle: "GSLV-D6",
    status: "Completed",
    date: "2015-08-27",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Communication",
    payload: "S-band communication satellite with a large unfurlable antenna",
    notes: [
      "Supported mobile communication including for defence applications.",
      "Carried one of the largest unfurlable antenna reflectors flown by ISRO at the time."
    ],
    flagship: false
  },
  {
    id: "seed-2017-gsat9",
    name: "GSAT-9 (South Asia Satellite)",
    vehicle: "GSLV-F09",
    status: "Completed",
    date: "2017-05-05",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Communication",
    payload: "Communication satellite gifted for shared use by South Asian neighbour countries",
    notes: [
      "Provided communication and disaster-support services to partner nations in the region.",
      "Seen as a flagship of India’s regional space diplomacy."
    ],
    flagship: false
  },
  {
    id: "seed-2019-cartosat3",
    name: "Cartosat-3",
    vehicle: "PSLV-C47",
    status: "Completed",
    date: "2019-11-27",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "ISRO's highest-resolution civilian earth observation satellite at the time",
    notes: [
      "Delivered sub-metre resolution imagery for mapping, urban planning and defence use.",
      "A major leap over earlier Cartosat generations."
    ],
    flagship: false
  },
  {
    id: "seed-2019-emisat",
    name: "EMISAT",
    vehicle: "PSLV-C45",
    status: "Completed",
    date: "2019-04-01",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Technology Demo",
    payload: "Electromagnetic spectrum measurement satellite for electronic intelligence",
    notes: [
      "Flown alongside 28 international rideshare satellites in three different orbits.",
      "Built by DRDO with ISRO providing the satellite bus."
    ],
    flagship: false
  },
  {
    id: "seed-2020-gsat30",
    name: "GSAT-30",
    vehicle: "Ariane 5",
    status: "Completed",
    date: "2020-01-17",
    site: "Kourou, French Guiana",
    category: "Communication",
    payload: "Replacement for INSAT-4A providing DTH, telecom and broadcast services",
    notes: [
      "Launched commercially on an Arianespace vehicle due to its mass class.",
      "Strengthened India’s satellite communication capacity."
    ],
    flagship: false
  },
  {
    id: "seed-2020-eos01",
    name: "EOS-01",
    vehicle: "PSLV-C49",
    status: "Completed",
    date: "2020-11-07",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Radar imaging satellite for agriculture, forestry and disaster support",
    notes: [
      "First ISRO launch after the pandemic-related pause in 2020.",
      "Flew alongside nine international rideshare satellites."
    ],
    flagship: false
  },
  {
    id: "seed-2021-amazonia1",
    name: "Amazonia-1 / PSLV-C51",
    vehicle: "PSLV-C51",
    status: "Completed",
    date: "2021-02-28",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Technology Demo",
    payload: "Brazil's Amazonia-1 earth observation satellite launched commercially, with Indian rideshare payloads",
    notes: [
      "First dedicated commercial mission of NSIL, ISRO’s commercial launch arm.",
      "Also carried India’s first student-built satellites among the rideshare payloads."
    ],
    flagship: false
  },
  {
    id: "seed-2021-eos03",
    name: "EOS-03",
    vehicle: "GSLV-F10",
    status: "Failed",
    date: "2021-08-12",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "Geostationary earth observation satellite for near real-time imaging",
    notes: [
      "First and second stages performed normally.",
      "The cryogenic upper stage failed to ignite, resulting in loss of the mission."
    ],
    flagship: false
  },
  {
    id: "seed-2022-eos04",
    name: "EOS-04 (RISAT-1A)",
    vehicle: "PSLV-C52",
    status: "Completed",
    date: "2022-02-14",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "All-weather radar imaging satellite for agriculture, forestry and hydrology",
    notes: [
      "First ISRO launch of 2022.",
      "Provides consistent radar imagery independent of weather or daylight."
    ],
    flagship: false
  },
  {
    id: "seed-2022-sslvd1",
    name: "SSLV-D1",
    vehicle: "SSLV (development flight)",
    status: "Failed",
    date: "2022-08-07",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Technology Demo",
    payload: "Maiden flight of the Small Satellite Launch Vehicle",
    notes: [
      "A sensor logic error left satellites in an unstable, unusable orbit.",
      "The satellites were later declared lost, though the vehicle mostly performed as designed."
    ],
    flagship: false
  },
  {
    id: "seed-2023-sslvd2",
    name: "SSLV-D2",
    vehicle: "SSLV",
    status: "Completed",
    date: "2023-02-10",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Technology Demo",
    payload: "Second, successful development flight of the Small Satellite Launch Vehicle",
    notes: [
      "Corrected the sensor issue from SSLV-D1 and placed all payloads accurately.",
      "Cleared the SSLV for regular operational service."
    ],
    flagship: false
  },
  {
    id: "seed-2023-nvs01",
    name: "NVS-01",
    vehicle: "GSLV-F12",
    status: "Completed",
    date: "2023-05-29",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Navigation",
    payload: "First second-generation NavIC navigation satellite",
    notes: [
      "Carries an indigenous atomic clock, reducing dependence on imported components.",
      "Begins replenishment of the NavIC constellation with longer-life satellites."
    ],
    flagship: false
  },
  {
    id: "seed-2024-proba3",
    name: "Proba-3",
    vehicle: "PSLV-C59",
    status: "Completed",
    date: "2024-12-05",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Technology Demo",
    payload: "ESA's precision formation-flying solar coronagraph mission, launched commercially by NSIL",
    notes: [
      "Two satellites fly in exact formation to create an artificial solar eclipse for coronal study.",
      "A commercial win for ISRO’s launch services arm on the international market."
    ],
    flagship: false
  },
  {
    id: "seed-2024-gsat20",
    name: "GSAT-20 (GSAT-N2)",
    vehicle: "Falcon 9 (SpaceX)",
    status: "Completed",
    date: "2024-11-19",
    site: "Kennedy Space Centre, USA",
    category: "Communication",
    payload: "High-throughput Ka-band broadband communication satellite",
    notes: [
      "Too heavy for any current ISRO vehicle, so launched commercially on a Falcon 9.",
      "Aims to expand in-flight and rural broadband connectivity across India."
    ],
    flagship: false
  },
  {
    id: "seed-placeholder-55",
    name: "Untitled Mission 55",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-56",
    name: "Untitled Mission 56",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-57",
    name: "Untitled Mission 57",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-58",
    name: "Untitled Mission 58",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-59",
    name: "Untitled Mission 59",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-60",
    name: "Untitled Mission 60",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-61",
    name: "Untitled Mission 61",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-62",
    name: "Untitled Mission 62",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-63",
    name: "Untitled Mission 63",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-64",
    name: "Untitled Mission 64",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-65",
    name: "Untitled Mission 65",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-66",
    name: "Untitled Mission 66",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-67",
    name: "Untitled Mission 67",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-68",
    name: "Untitled Mission 68",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-69",
    name: "Untitled Mission 69",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-70",
    name: "Untitled Mission 70",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-71",
    name: "Untitled Mission 71",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-72",
    name: "Untitled Mission 72",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-73",
    name: "Untitled Mission 73",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-74",
    name: "Untitled Mission 74",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-75",
    name: "Untitled Mission 75",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-76",
    name: "Untitled Mission 76",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-77",
    name: "Untitled Mission 77",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-78",
    name: "Untitled Mission 78",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-79",
    name: "Untitled Mission 79",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-80",
    name: "Untitled Mission 80",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-81",
    name: "Untitled Mission 81",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-82",
    name: "Untitled Mission 82",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-83",
    name: "Untitled Mission 83",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-84",
    name: "Untitled Mission 84",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-85",
    name: "Untitled Mission 85",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-86",
    name: "Untitled Mission 86",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-87",
    name: "Untitled Mission 87",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-88",
    name: "Untitled Mission 88",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-89",
    name: "Untitled Mission 89",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-90",
    name: "Untitled Mission 90",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-91",
    name: "Untitled Mission 91",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-92",
    name: "Untitled Mission 92",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-93",
    name: "Untitled Mission 93",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-94",
    name: "Untitled Mission 94",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-95",
    name: "Untitled Mission 95",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-96",
    name: "Untitled Mission 96",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-97",
    name: "Untitled Mission 97",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-98",
    name: "Untitled Mission 98",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-99",
    name: "Untitled Mission 99",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-100",
    name: "Untitled Mission 100",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-101",
    name: "Untitled Mission 101",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-102",
    name: "Untitled Mission 102",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-103",
    name: "Untitled Mission 103",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-104",
    name: "Untitled Mission 104",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-105",
    name: "Untitled Mission 105",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-106",
    name: "Untitled Mission 106",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-107",
    name: "Untitled Mission 107",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-108",
    name: "Untitled Mission 108",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-109",
    name: "Untitled Mission 109",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-110",
    name: "Untitled Mission 110",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-111",
    name: "Untitled Mission 111",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-112",
    name: "Untitled Mission 112",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-113",
    name: "Untitled Mission 113",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-114",
    name: "Untitled Mission 114",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-115",
    name: "Untitled Mission 115",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-116",
    name: "Untitled Mission 116",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-117",
    name: "Untitled Mission 117",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-118",
    name: "Untitled Mission 118",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-119",
    name: "Untitled Mission 119",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-120",
    name: "Untitled Mission 120",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-121",
    name: "Untitled Mission 121",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-122",
    name: "Untitled Mission 122",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-123",
    name: "Untitled Mission 123",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-124",
    name: "Untitled Mission 124",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-125",
    name: "Untitled Mission 125",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-126",
    name: "Untitled Mission 126",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-127",
    name: "Untitled Mission 127",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-128",
    name: "Untitled Mission 128",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-129",
    name: "Untitled Mission 129",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-130",
    name: "Untitled Mission 130",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-131",
    name: "Untitled Mission 131",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-132",
    name: "Untitled Mission 132",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  },
  {
    id: "seed-placeholder-133",
    name: "Untitled Mission 133",
    vehicle: "",
    status: "Planned",
    date: "",
    site: "Satish Dhawan Space Centre, Sriharikota",
    category: "Earth Observation",
    payload: "",
    notes: [],
    flagship: false
  }
];

/* ---------- rocket specifications reference data ---------- */
const ROCKET_SPECS = [
  {
    name: 'SLV-3',
    status: 'Retired',
    era: 'First flight 10 Aug 1979 \u00b7 Last flight 17 Apr 1983 \u00b7 4 launches',
    height: '22 m', diameter: '1 m', mass: '17,000 kg', stages: '4 (all-solid)',
    leo: '40 kg to 400 km LEO', gto: 'Not applicable',
    record: '2 successes, 1 failure, 1 partial failure',
    notes: "India's first satellite launch vehicle. Its 1980 flight with Rohini RS-1 made India the sixth nation to reach orbit with an indigenous rocket.",
    boosters: 0, bodyW: 1.0, stubby: false
  },
  {
    name: 'ASLV',
    status: 'Retired',
    era: 'First flight 24 Mar 1987 \u00b7 Last flight 4 May 1994 \u00b7 4 launches',
    height: '23.5 m', diameter: '1 m', mass: '41,000 kg', stages: '5 (core + 2 strap-ons, all-solid)',
    leo: '150 kg to 400 km LEO', gto: 'Not applicable',
    record: '1 success, 2 failures, 1 partial failure',
    notes: 'An interim vehicle meant to bridge SLV-3 and PSLV. A high height-to-diameter ratio made it aerodynamically unstable, and it was retired after mixed results.',
    boosters: 2, bodyW: 1.0, stubby: false
  },
  {
    name: 'PSLV',
    status: 'Active',
    era: 'First flight 20 Sep 1993 \u00b7 60+ launches \u00b7 ~96% success rate',
    height: '44.4 m', diameter: '2.8 m', mass: '~320,000 kg (XL variant)', stages: '4 (solid-liquid-solid-liquid)',
    leo: 'Up to 3,800 kg to LEO', gto: 'Up to 1,425 kg to GTO (XL variant)',
    record: 'Flown in Core-Alone, standard and XL (6 strap-on booster) variants',
    notes: "ISRO's workhorse. Launched Chandrayaan-1, the Mars Orbiter Mission, AstroSat and a record 104 satellites on a single 2017 flight. Its only losses have been PSLV-D1 (1993), a partial failure on PSLV-C1 (1997), and EOS-09 (2025).",
    boosters: 6, bodyW: 1.2, stubby: false
  },
  {
    name: 'GSLV Mk II',
    status: 'Active',
    era: 'Mk I first flight 18 Apr 2001 (retired) \u00b7 Mk II first flight 15 Apr 2010 \u00b7 18+ launches',
    height: '49.1 m', diameter: '2.8 m', mass: '~415,000 kg', stages: '3, with 4 liquid strap-on boosters',
    leo: 'Up to 6,000 kg to LEO', gto: 'Up to 2,500 kg to GTO',
    record: 'Indigenous cryogenic upper stage in service since GSLV-D5 (Jan 2014)',
    notes: 'Carries the INSAT/GSAT communication satellite series and, most recently, NISAR. Early flights relied on Russian-supplied cryogenic stages before India developed its own.',
    boosters: 4, bodyW: 1.3, stubby: false
  },
  {
    name: 'LVM3 (GSLV Mk III)',
    status: 'Active',
    era: 'Suborbital test 18 Dec 2014 \u00b7 First orbital flight 5 Jun 2017 \u00b7 100% mission success so far',
    height: '43.4 m', diameter: '4 m', mass: '~640,000 kg', stages: '3, with 2 solid S200 strap-on boosters',
    leo: 'Up to 10,000 kg to LEO', gto: 'Up to 4,000 kg to GTO',
    record: 'Every orbital flight successful to date',
    notes: "India's heaviest-lift and only human-rated launch vehicle. Carried Chandrayaan-2, Chandrayaan-3, one Gaganyaan test flight, and a batch of OneWeb satellites.",
    boosters: 2, bodyW: 1.8, stubby: false
  },
  {
    name: 'SSLV',
    status: 'Active',
    era: 'First flight 7 Aug 2022 (partial failure) \u00b7 Operational since SSLV-D2 (Feb 2023)',
    height: '34 m', diameter: '2 m', mass: '~120,000 kg', stages: '3 solid stages + a liquid Velocity Trimming Module',
    leo: 'Up to 500 kg to 500 km LEO', gto: 'Not designed for GTO',
    record: 'Built for quick-turnaround small-satellite launches on demand',
    notes: "ISRO's newest and smallest vehicle, designed for low-cost, rapid-turnaround launches of small satellites, aimed at the growing commercial smallsat market.",
    boosters: 0, bodyW: 1.4, stubby: true
  }
];

/* ---------- rocket illustration generator (original SVG art, no external images) ---------- */
function buildRocketSVG(spec){
  const w = 140, h = 220;
  const cx = w / 2;
  const bodyHalf = 11 * spec.bodyW;
  const bodyTop = spec.stubby ? 70 : 34;
  const bodyBottom = 168;
  const noseTip = spec.stubby ? 40 : 14;

  let boosterMarkup = '';
  const boosterCount = spec.boosters;
  if (boosterCount > 0){
    const pairs = Math.ceil(boosterCount / 2);
    const boosterW = 6;
    const boosterTop = bodyTop + 34;
    const boosterBottom = bodyBottom - 4;
    for (let i = 0; i < pairs; i++){
      const gap = 6 + i * (boosterW + 4);
      const leftX = cx - bodyHalf - gap - boosterW;
      const rightX = cx + bodyHalf + gap;
      boosterMarkup += `
        <rect x="${leftX}" y="${boosterTop}" width="${boosterW}" height="${boosterBottom - boosterTop}" rx="2" fill="var(--panel-line)" stroke="var(--steel)" stroke-width="1"/>
        <rect x="${rightX}" y="${boosterTop}" width="${boosterW}" height="${boosterBottom - boosterTop}" rx="2" fill="var(--panel-line)" stroke="var(--steel)" stroke-width="1"/>
        <path d="M ${leftX} ${boosterBottom} L ${leftX + boosterW/2} ${boosterBottom + 12} L ${leftX + boosterW} ${boosterBottom} Z" fill="var(--isro-orange)" opacity="0.85"/>
        <path d="M ${rightX} ${boosterBottom} L ${rightX + boosterW/2} ${boosterBottom + 12} L ${rightX + boosterW} ${boosterBottom} Z" fill="var(--isro-orange)" opacity="0.85"/>
      `;
    }
  }

  return `
  <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${spec.name} illustration">
    <ellipse cx="${cx}" cy="198" rx="34" ry="6" fill="#000" opacity="0.25"/>
    ${boosterMarkup}
    <path d="M ${cx - bodyHalf} ${bodyTop + 10} Q ${cx} ${noseTip} ${cx + bodyHalf} ${bodyTop + 10} Z" fill="var(--isro-orange)"/>
    <rect x="${cx - bodyHalf}" y="${bodyTop + 8}" width="${bodyHalf * 2}" height="${bodyBottom - bodyTop - 8}" fill="var(--ink)" opacity="0.92" rx="2"/>
    <rect x="${cx - bodyHalf}" y="${(bodyTop + bodyBottom) / 2 - 4}" width="${bodyHalf * 2}" height="8" fill="var(--isro-blue)" opacity="0.9"/>
    <path d="M ${cx - bodyHalf} ${bodyBottom - 14} L ${cx - bodyHalf - 12} ${bodyBottom + 6} L ${cx - bodyHalf} ${bodyBottom} Z" fill="var(--steel)"/>
    <path d="M ${cx + bodyHalf} ${bodyBottom - 14} L ${cx + bodyHalf + 12} ${bodyBottom + 6} L ${cx + bodyHalf} ${bodyBottom} Z" fill="var(--steel)"/>
    <path d="M ${cx - bodyHalf + 3} ${bodyBottom} L ${cx} ${bodyBottom + 20} L ${cx + bodyHalf - 3} ${bodyBottom} Z" fill="var(--isro-orange)"/>
    <path d="M ${cx - 4} ${bodyBottom} L ${cx} ${bodyBottom + 12} L ${cx + 4} ${bodyBottom} Z" fill="#ffd9a0"/>
  </svg>`;
}

/* ---------- category icons (original SVG art, no external images) ---------- */
const CATEGORY_ICONS = {
  'Earth Observation': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="7.2" stroke="currentColor" stroke-width="1.6"/><path d="M5 10c2 1.5 5 1.5 7-.5s5-2 7-.5" stroke="currentColor" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="10.4" ry="4" stroke="currentColor" stroke-width="1.1" opacity="0.6"/></svg>`,
  'Communication': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 15 L15 4" stroke="currentColor" stroke-width="1.6"/><path d="M9 4 C9 10 14 15 20 15" stroke="currentColor" stroke-width="1.4"/><circle cx="4" cy="15" r="1.6" fill="currentColor"/><path d="M15 4 L20 4 L20 9" stroke="currentColor" stroke-width="1.4"/><path d="M6 18 L4 20 M9 19 L7 21" stroke="currentColor" stroke-width="1.3"/></svg>`,
  'Navigation': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2 C7 2 4 5.5 4 10 C4 15 12 22 12 22 C12 22 20 15 20 10 C20 5.5 17 2 12 2 Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.4"/></svg>`,
  'Lunar': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3 A9 9 0 1 0 15 21 A7 7 0 0 1 15 3 Z" stroke="currentColor" stroke-width="1.4" fill="currentColor" opacity="0.15"/><path d="M15 3 A9 9 0 1 0 15 21 A7 7 0 0 1 15 3 Z" stroke="currentColor" stroke-width="1.4"/></svg>`,
  'Interplanetary': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10.5" ry="3.2" stroke="currentColor" stroke-width="1.3" transform="rotate(-18 12 12)"/></svg>`,
  'Astronomy': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2 L14 9 L21 9 L15.5 13 L17.5 20 L12 16 L6.5 20 L8.5 13 L3 9 L10 9 Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  'Human Spaceflight': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2 C16 2 17.5 7 17.5 11 C17.5 16 15 20 12 22 C9 20 6.5 16 6.5 11 C6.5 7 8 2 12 2 Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.8" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 15 L3 18 M17.5 15 L21 18" stroke="currentColor" stroke-width="1.3"/></svg>`,
  'Technology Demo': `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.5"/><path d="M12 3 L12 6 M12 18 L12 21 M3 12 L6 12 M18 12 L21 12 M5.6 5.6 L7.7 7.7 M16.3 16.3 L18.4 18.4 M5.6 18.4 L7.7 16.3 M16.3 7.7 L18.4 5.6" stroke="currentColor" stroke-width="1.5"/></svg>`
};




/* ---------- state ---------- */
let missions = loadMissions();
let activeStatus = 'All';
let activeCategory = 'All';
let searchTerm = '';

/* ---------- persistence ---------- */
function loadMissions(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  }catch(err){
    console.warn('Could not read saved missions, starting fresh.', err);
  }
  return SEED_MISSIONS.slice();
}

function saveMissions(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  }catch(err){
    console.warn('Could not save missions to this browser.', err);
  }
}

/* ---------- DOM refs ---------- */
const gridEl        = document.getElementById('grid');
const emptyStateEl  = document.getElementById('emptyState');
const cardTemplate  = document.getElementById('cardTemplate');
const filtersEl     = document.getElementById('statusFilters');
const categoryFilterEl = document.getElementById('categoryFilter');
const searchInput   = document.getElementById('searchInput');
const clockEl       = document.getElementById('clock');
const specsBtn        = document.getElementById('specsBtn');
const specsOverlay     = document.getElementById('specsOverlay');
const specsCloseBtn    = document.getElementById('specsCloseBtn');
const specsGrid         = document.getElementById('specsGrid');
const specCardTemplate  = document.getElementById('specCardTemplate');

const statTotal    = document.getElementById('statTotal');
const statActive   = document.getElementById('statActive');
const statSuccess  = document.getElementById('statSuccess');
const statPlanned  = document.getElementById('statPlanned');

const overlay       = document.getElementById('overlay');
const missionForm   = document.getElementById('missionForm');
const editorTitle   = document.getElementById('editorTitle');
const newMissionBtn = document.getElementById('newMissionBtn');
const closeBtn      = document.getElementById('closeBtn');
const cancelBtn     = document.getElementById('cancelBtn');
const deleteBtn     = document.getElementById('deleteBtn');

const fId       = document.getElementById('missionId');
const fName     = document.getElementById('fName');
const fVehicle  = document.getElementById('fVehicle');
const fStatus   = document.getElementById('fStatus');
const fCategory = document.getElementById('fCategory');
const fDate     = document.getElementById('fDate');
const fSite     = document.getElementById('fSite');
const fPayload  = document.getElementById('fPayload');
const fNotes    = document.getElementById('fNotes');
const fFlagship = document.getElementById('fFlagship');

const detailOverlay     = document.getElementById('detailOverlay');
const detailCloseBtn    = document.getElementById('detailCloseBtn');
const dStatus            = document.getElementById('dStatus');
const dIcon               = document.getElementById('dIcon');
const dCat               = document.getElementById('dCat');
const dName              = document.getElementById('dName');
const dMeta              = document.getElementById('dMeta');
const dPayload           = document.getElementById('dPayload');
const dNotes             = document.getElementById('dNotes');
const editFromDetailBtn  = document.getElementById('editFromDetailBtn');

let currentDetailId = null;

/* ---------- clock ---------- */
function tickClock(){
  const now = new Date();
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const hh = String(ist.getHours()).padStart(2, '0');
  const mm = String(ist.getMinutes()).padStart(2, '0');
  const ss = String(ist.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm}:${ss}`;
}
tickClock();
setInterval(tickClock, 1000);

/* ---------- stats ---------- */
function renderStats(){
  statTotal.textContent = missions.length;
  statActive.textContent = missions.filter(m => m.status === 'Active').length;
  statSuccess.textContent = missions.filter(m => m.status === 'Completed').length;
  statPlanned.textContent = missions.filter(m => m.status === 'Planned').length;
}

/* ---------- rendering (READ) ---------- */
function render(){
  const term = searchTerm.trim().toLowerCase();

  const visible = missions.filter(m => {
    const matchesStatus = activeStatus === 'All' || m.status === activeStatus;
    if (!matchesStatus) return false;
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
    if (!matchesCategory) return false;
    if (!term) return true;
    const haystack = `${m.name} ${m.vehicle} ${m.payload}`.toLowerCase();
    return haystack.includes(term);
  });

  // most recent / most relevant first
  visible.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  gridEl.innerHTML = '';

  if (visible.length === 0){
    emptyStateEl.hidden = false;
  } else {
    emptyStateEl.hidden = true;
    visible.forEach(m => gridEl.appendChild(buildCardEl(m)));
  }

  renderStats();
}

function formatDate(iso){
  if (!iso) return 'Date TBD';
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return 'Date TBD';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function buildCardEl(mission){
  const node = cardTemplate.content.firstElementChild.cloneNode(true);
  node.dataset.status = mission.status;
  if (mission.flagship) node.classList.add('is-flag');

  node.querySelector('.mcard-status').textContent = mission.status.toUpperCase();
  node.querySelector('.mcard-icon').innerHTML = CATEGORY_ICONS[mission.category] || CATEGORY_ICONS['Technology Demo'];
  node.querySelector('.mcard-name').textContent = mission.name;
  node.querySelector('.mcard-vehicle').textContent = mission.vehicle || 'Vehicle TBD';
  node.querySelector('.mcard-payload').textContent = mission.payload || 'No payload description on file.';
  node.querySelector('.mcard-cat').textContent = mission.category || 'Uncategorised';
  node.querySelector('.mcard-date').textContent = formatDate(mission.date);

  node.addEventListener('click', () => openDetail(mission.id));
  node.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      openDetail(mission.id);
    }
  });

  return node;
}

/* ---------- detail (READ, single) ---------- */
function openDetail(id){
  const mission = missions.find(m => m.id === id);
  if (!mission) return;
  currentDetailId = id;

  dStatus.textContent = mission.status.toUpperCase();
  dIcon.innerHTML = CATEGORY_ICONS[mission.category] || CATEGORY_ICONS['Technology Demo'];
  dName.textContent = mission.name;
  dCat.textContent = mission.category || '';

  const metaBits = [mission.vehicle || 'Vehicle TBD', formatDate(mission.date)];
  if (mission.site) metaBits.push(mission.site);
  if (mission.flagship) metaBits.push('Flagship \u2605');
  dMeta.textContent = metaBits.join(' \u00b7 ');

  dPayload.textContent = mission.payload || 'No payload description on file.';

  dNotes.innerHTML = '';
  if (mission.notes.length === 0){
    const li = document.createElement('li');
    li.textContent = 'No log entries yet.';
    dNotes.appendChild(li);
  } else {
    mission.notes.forEach(note => {
      const li = document.createElement('li');
      li.textContent = note;
      dNotes.appendChild(li);
    });
  }

  detailOverlay.hidden = false;
}

function closeDetail(){
  detailOverlay.hidden = true;
  currentDetailId = null;
}

/* ---------- editor open/close (CREATE + UPDATE entry points) ---------- */
function openEditor(mission){
  missionForm.reset();

  if (mission){
    editorTitle.textContent = mission.name;
    fId.value = mission.id;
    fName.value = mission.name;
    fVehicle.value = mission.vehicle || '';
    fStatus.value = mission.status;
    fCategory.value = mission.category || 'Earth Observation';
    fDate.value = mission.date || '';
    fSite.value = mission.site || '';
    fPayload.value = mission.payload || '';
    fNotes.value = mission.notes.join('\n');
    fFlagship.checked = !!mission.flagship;
    deleteBtn.hidden = false;
  } else {
    editorTitle.textContent = 'New Mission';
    fId.value = '';
    fStatus.value = activeStatus !== 'All' ? activeStatus : 'Planned';
    fCategory.value = activeCategory !== 'All' ? activeCategory : 'Earth Observation';
    fSite.value = 'Satish Dhawan Space Centre, Sriharikota';
    deleteBtn.hidden = true;
  }

  overlay.hidden = false;
  fName.focus();
}

function closeEditor(){
  overlay.hidden = true;
}

/* ---------- CREATE + UPDATE (form submit) ---------- */
missionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = fName.value.trim();
  if (!name){
    fName.focus();
    return;
  }

  const payload = {
    name,
    vehicle: fVehicle.value.trim(),
    status: fStatus.value,
    category: fCategory.value,
    date: fDate.value,
    site: fSite.value.trim(),
    payload: fPayload.value.trim(),
    notes: fNotes.value.split('\n').map(s => s.trim()).filter(Boolean),
    flagship: fFlagship.checked
  };

  if (fId.value){
    // UPDATE
    const idx = missions.findIndex(m => m.id === fId.value);
    if (idx !== -1){
      missions[idx] = { ...missions[idx], ...payload };
    }
  } else {
    // CREATE
    missions.unshift({ id: 'm-' + Date.now(), ...payload });
  }

  saveMissions();
  closeEditor();
  render();
});

/* ---------- DELETE ---------- */
deleteBtn.addEventListener('click', () => {
  if (!fId.value) return;
  const mission = missions.find(m => m.id === fId.value);
  const ok = confirm(`Scrub "${mission ? mission.name : 'this mission'}" from the log for good?`);
  if (!ok) return;

  missions = missions.filter(m => m.id !== fId.value);
  saveMissions();
  closeEditor();
  render();
});

/* ---------- status filters ---------- */
filtersEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.light');
  if (!btn) return;
  activeStatus = btn.dataset.status;
  [...filtersEl.children].forEach(t => t.classList.toggle('active', t === btn));
  render();
});

/* ---------- search ---------- */
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value;
  render();
});

/* ---------- category filter ---------- */
categoryFilterEl.addEventListener('change', (e) => {
  activeCategory = e.target.value;
  render();
});

/* ---------- rocket specs panel ---------- */
function renderSpecs(){
  specsGrid.innerHTML = '';
  ROCKET_SPECS.forEach(spec => {
    const node = specCardTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector('.spec-illustration').innerHTML = buildRocketSVG(spec);
    node.querySelector('.spec-name').textContent = spec.name;
    const statusEl = node.querySelector('.spec-status');
    statusEl.textContent = spec.status.toUpperCase();
    statusEl.classList.add(spec.status === 'Active' ? 'is-active' : 'is-retired');
    node.querySelector('.spec-era').textContent = spec.era;
    node.querySelector('.spec-height').textContent = spec.height;
    node.querySelector('.spec-diameter').textContent = spec.diameter;
    node.querySelector('.spec-mass').textContent = spec.mass;
    node.querySelector('.spec-stages').textContent = spec.stages;
    node.querySelector('.spec-leo').textContent = spec.leo;
    node.querySelector('.spec-gto').textContent = spec.gto;
    node.querySelector('.spec-record').textContent = spec.record;
    node.querySelector('.spec-notes').textContent = spec.notes;
    specsGrid.appendChild(node);
  });
}

function openSpecs(){
  renderSpecs();
  specsOverlay.hidden = false;
}
function closeSpecs(){
  specsOverlay.hidden = true;
}

specsBtn.addEventListener('click', openSpecs);
specsCloseBtn.addEventListener('click', closeSpecs);
specsOverlay.addEventListener('click', (e) => { if (e.target === specsOverlay) closeSpecs(); });

/* ---------- open / close wiring ---------- */
newMissionBtn.addEventListener('click', () => openEditor(null));
closeBtn.addEventListener('click', closeEditor);
cancelBtn.addEventListener('click', closeEditor);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeEditor(); });

detailCloseBtn.addEventListener('click', closeDetail);
detailOverlay.addEventListener('click', (e) => { if (e.target === detailOverlay) closeDetail(); });
editFromDetailBtn.addEventListener('click', () => {
  const mission = missions.find(m => m.id === currentDetailId);
  closeDetail();
  if (mission) openEditor(mission);
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!overlay.hidden) closeEditor();
  if (!detailOverlay.hidden) closeDetail();
  if (!specsOverlay.hidden) closeSpecs();
});

/* ---------- go ---------- */
render();
