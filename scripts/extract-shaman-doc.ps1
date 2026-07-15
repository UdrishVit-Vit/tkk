param(
  [Parameter(Mandatory = $true)]
  [string]$Source,
  [string]$Destination = 'app/data/shamanDoc.generated.json'
)

$ErrorActionPreference = 'Stop'
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
Add-Type -AssemblyName System.IO.Compression

$stream = [System.IO.FileStream]::new(
  $Source,
  [System.IO.FileMode]::Open,
  [System.IO.FileAccess]::Read,
  [System.IO.FileShare]::ReadWrite
)
$archive = [System.IO.Compression.ZipArchive]::new(
  $stream,
  [System.IO.Compression.ZipArchiveMode]::Read,
  $false
)

try {
  $entry = $archive.GetEntry('word/document.xml')
  $reader = [System.IO.StreamReader]::new($entry.Open())
  try { [xml]$xml = $reader.ReadToEnd() } finally { $reader.Dispose() }
} finally {
  $archive.Dispose()
  $stream.Dispose()
}

$ns = [System.Xml.XmlNamespaceManager]::new($xml.NameTable)
$ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
$body = $xml.SelectSingleNode('//w:body', $ns)
$nodes = [System.Collections.Generic.List[object]]::new()
$index = 0

foreach ($node in $body.ChildNodes) {
  if ($node.LocalName -eq 'p') {
    $text = (($node.SelectNodes('.//w:t', $ns) | ForEach-Object { $_.InnerText }) -join '').Trim()
    if ($text) {
      $nodes.Add([ordered]@{
        index = $index
        type = 'paragraph'
        text = $text
        bold = $node.SelectNodes('.//w:r/w:rPr/w:b', $ns).Count -gt 0
      })
    }
  } elseif ($node.LocalName -eq 'tbl') {
    $rows = @()
    foreach ($row in $node.SelectNodes('./w:tr', $ns)) {
      $rows += ,@($row.SelectNodes('./w:tc', $ns) | ForEach-Object {
        (($_.SelectNodes('.//w:t', $ns) | ForEach-Object { $_.InnerText }) -join '').Trim()
      })
    }
    $nodes.Add([ordered]@{ index = $index; type = 'table'; rows = $rows })
  }
  $index++
}

$json = $nodes | ConvertTo-Json -Depth 8
[System.IO.File]::WriteAllText(
  (Join-Path (Get-Location) $Destination),
  $json,
  [System.Text.UTF8Encoding]::new($false)
)
