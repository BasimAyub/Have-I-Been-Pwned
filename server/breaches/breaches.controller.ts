import axios from 'axios';
import { Request, Response } from 'express';

interface Breach {
  name: string;
  domain: string;
  breachDate: string;
  description: string;
  dataClasses: string[];
  isVerified: boolean;
  isFabricated: boolean;
  isSensitive: boolean;
  isRetired: boolean;
  isSpamList: boolean;
  isMalware: boolean;
  logoPath: string;
}

export const getBreaches = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.query;

    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!email || typeof email !== 'string' || !validateEmail(email)) {
      res.status(400).json({ error: 'Invalid email address' });
      return;
    }

    const encodedEmail = encodeURIComponent(email);
    const apiUrl = `${process.env.HIBP_API_URL}/${encodedEmail}?truncateResponse=false`;
    const response = await axios.get(apiUrl, {
      headers: {
        'hibp-api-key': process.env.HIBP_API_KEY,
      },
    });

    const breaches: Breach[] = response.data.map((breach: any) => ({
      name: breach.Name,
      domain: breach.Domain,
      breachDate: breach.BreachDate,
      description: breach.Description,
      dataClasses: breach.DataClasses,
      isVerified: breach.IsVerified,
      isFabricated: breach.IsFabricated,
      isSensitive: breach.IsSensitive,
      isRetired: breach.IsRetired,
      isSpamList: breach.IsSpamList,
      isMalware: breach.IsMalware,
      logoPath: breach.LogoPath,
    }));

    res.json(breaches);
  } catch (error) {
    const errorResponse = error.response;

    if (errorResponse.status === 404) {
      res.json([]);
    } else {
      console.error('Error fetching breaches:', errorResponse.statusText);
      res
        .status(errorResponse.status)
        .json({ error: errorResponse.statusText });
    }
  }
};
