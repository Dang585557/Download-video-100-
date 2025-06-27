import { exec } from 'child_process';

export default async function handler(req, res) {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'ลิงก์ไม่ถูกต้อง' });

  const cmd = `yt-dlp -f "best[height<=1080]" -J "${videoUrl}"`;
  exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
    if (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ error: 'ไม่สามารถดึงวิดีโอได้' });
    }

    try {
      const data = JSON.parse(stdout);
      const formats = data.formats.filter(f => f.url && f.format_note).map(f => ({
        url: f.url,
        format_note: f.format_note,
        height: f.height
      }));
      res.json({ formats });
    } catch (e) {
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแปลงข้อมูล' });
    }
  });
}
