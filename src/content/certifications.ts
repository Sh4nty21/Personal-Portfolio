/**
 * Certifications with files (D15: Huawei and MathWorks left off).
 * Microsoft ones are ExpertZone partner-training certificates — labelled so
 * they aren't mistaken for Microsoft Learn role-based certifications.
 */

export type Certification = {
  title: string;
  issuer: string;
  issued: string;
  validUntil?: string;
  credentialId?: string;
  /** Where a viewer can check it. */
  verifyAt?: string;
  image: { src: string; width: number; height: number };
};

export const certifications: Certification[] = [
  {
    title: "Fortinet Certified Associate in Cybersecurity",
    issuer: "Fortinet",
    issued: "Jul 2025",
    validUntil: "Jul 2027",
    credentialId: "3818840647SM",
    verifyAt: "training.fortinet.com",
    image: {
      src: "/images/certifications/fortinet-associate-cybersecurity.jpg",
      width: 1348,
      height: 953,
    },
  },
  {
    title: "Fortinet Certified Fundamentals in Cybersecurity",
    issuer: "Fortinet",
    issued: "Jun 2025",
    validUntil: "Jun 2027",
    credentialId: "2362761279SM",
    verifyAt: "training.fortinet.com",
    image: {
      src: "/images/certifications/fortinet-fundamentals-cybersecurity.jpg",
      width: 1348,
      height: 953,
    },
  },
  {
    title: "DHCA – DoLynk Cloud Management System Certified Engineer",
    issuer: "Dahua Technology",
    issued: "Jul 2025",
    validUntil: "Jul 2027",
    credentialId: "DHCA-DLKEN202507080220",
    verifyAt: "dahuasecurity.com",
    image: {
      src: "/images/certifications/dahua-dhca-dolynk.jpg",
      width: 1170,
      height: 860,
    },
  },
  {
    title: "Microsoft Places Technical Solutions Professional 2025",
    issuer: "Microsoft ExpertZone",
    issued: "Jun 2025",
    image: {
      src: "/images/certifications/microsoft-places-technical-solutions.jpg",
      width: 1400,
      height: 956,
    },
  },
  {
    title: "Microsoft Teams Rooms Solution Sales Professional 2025",
    issuer: "Microsoft ExpertZone",
    issued: "Jul 2025",
    image: {
      src: "/images/certifications/microsoft-teams-rooms-solution-sales.jpg",
      width: 1400,
      height: 956,
    },
  },
];
